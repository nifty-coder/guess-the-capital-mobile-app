import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Pressable, Text, Image, View, FlatList, Alert, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import LoadingGif from '../assets/loadingWins.gif';
import CountryCard from '../components/CountryCard';

function WinsScreen({ navigation }) {
  let data, player;
  const [winCountries, setWinCountries] = useState([]);
  const [winner, setWinner] = useState();

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
    data = await AsyncStorage.getItem("wins").then((res) => {
      let parsedData = JSON.parse(res);
      return parsedData;
    }); 
    player = await AsyncStorage.getItem("player");
  };
  useEffect(() => {
   loadAsyncStorageData()
    .then(() => {
      setWinCountries(data);
      setWinner(player);
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
   const { capital, flag, name, population, continents, coatOfArms } = winc;
   
   return (
    <View>
     <CountryCard
     key={i}
     player={winner}
     wonGame
     capital={capital}
     flag={flag} 
     name={name.common} 
     population={population}
     continents={continents}
     seal={coatOfArms} />

     <View style={styles.divider} />
     </View>
    );
  };

  const jsx = winCountries ? (
    <FlatList 
    data={winCountries}
    renderItem={({ item, index }) => renderCountryList(item, index)} />
  ) : <Image source={LoadingGif} style={styles.loadingGif} />;

  return (
   <View style={{ flex: 1 }}>
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
  divider: {
    borderBottomColor: Colors.appTheme.orange,
    borderBottomWidth: 2
  },
  thatsItText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic'
  }
});