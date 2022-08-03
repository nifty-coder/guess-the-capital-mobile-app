import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Pressable, Text, Image, View, FlatList, Alert, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import LoadingGif from '../assets/loadingWins.gif';
import CountryCard from '../components/CountryCard';

function WinsScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
//  const playerName = route?.params?.playerName;
  let data;
  const [winCountries, setWinCountries] = useState([]);
  
  useLayoutEffect(() => {
    const clearData = async () => {
      await AsyncStorage.removeItem("wins"); 
      setWinCountries(null);
    };

    navigation.setOptions({
      headerRight: () => (
        <Pressable 
        style={{ marginRight: 15 }}
        android_ripple={{ color: '#fff' }} 
        onPress={clearData}>
         <MaterialIcons name="clear-all" size={32} />
        </Pressable> 
      )
    });
  }, [navigation]);

  const loadAsyncStorageData = async () => {
    setRefreshing(true);
    data = await AsyncStorage.getItem("wins").then((res) => {
      let parsedData = JSON.parse(res);
      // playerName = "Husky";
      // let filteredData = parsedData.filter((win) => win.player === playerName);
      return parsedData;
    }); 
    setRefreshing(false);
  };
  useEffect(() => {
   loadAsyncStorageData()
    .then(() => {
      setWinCountries(data);
    }).catch((err) => {
     return Alert.alert(
      "Something went wrong!", 
      "Please try again later.", 
      [{ text: 'Okay', onPress: () => navigation.navigate("Home") }]
     );
    });
      
    return () => setWinCountries(null);
  }, [data]);
  
  function renderCountryList(winc, i) {
   const { capital, flag, name, population, continents, coatOfArms } = winc.country;
   
   return (
    <View>
     <CountryCard
     key={i}
     player={winc.player}
     wonGame={true}
     capital={capital}
     flag={flag} 
     name={name.common} 
     population={population}
     continents={continents}
     seal={coatOfArms}
     />

      <View
      style={{
       borderBottomColor: Colors.appTheme.orange,
       borderBottomWidth: 2
      }} />
     </View>
    );
  };

  const jsx = winCountries ? (
    <FlatList 
    data={winCountries}
    renderItem={({ item, index }) => renderCountryList(item, index)}
    refreshing={refreshing}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={loadAsyncStorageData} />
    } />  
  ) : <Image source={LoadingGif} style={styles.loadingGif} />;

  return (
   <View>
    <Text style={styles.scoreText}>
     Your Score: {winCountries ? winCountries.length : '0'}
    </Text>
    {jsx}
    {winCountries && <Text style={styles.thatsItText}>That's it so far!</Text>}
   </View>
  );
};

export default WinsScreen;

const styles = StyleSheet.create({
  scoreText: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  loadingGif: {
    marginTop: 16,
    alignSelf: 'center'
  },
  thatsItText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic'
  }
});