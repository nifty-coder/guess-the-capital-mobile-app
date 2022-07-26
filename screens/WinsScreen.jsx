import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Pressable, Image, View, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryJSX from '../components/jsx/CountryJSX';
import Colors from '../constants/Colors';
import LoadingGif from '../assets/loadingWins.gif';

function WinsScreen({ navigation }) {
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

  useEffect(() => {
    const loadAsyncStorageData = async () => {
      data = await AsyncStorage.getItem("wins").then((res) => {
        return JSON.parse(res);
      }); 
    };
   loadAsyncStorageData()
    .then(() => {
      setWinCountries(data);
    }).catch((err) => {
     return Alert.alert(
      "Something went wrong!", 
      "Please try again later.", 
      { text: 'Okay', onPress: () => navigation.navigate("Home") }
     );
    });
      
    return () => setWinCountries(null);
  }, [data]);
  
  function renderCountryList(winc, i) {
    return (
     <Fragment>
      <CountryJSX
      key={i}
      player={winc?.player}
      wonGame={true}
      capital={winc?.country?.capital}
      randomizedCountry={winc?.country} />

      <View
        style={{
          borderBottomColor: Colors.appTheme.orange,
          borderBottomWidth: 2
        }} />
     </Fragment>
    );
  };

  const jsx = winCountries ? (
    <FlatList 
    data={winCountries}
    renderItem={({ item, index }) => renderCountryList(item, index)} />  
  ) : <Image source={LoadingGif} style={styles.loadingGif} />;

  return jsx;
};

export default WinsScreen;

const styles = StyleSheet.create({
  loadingGif: {
    marginTop: 4,
    alignSelf: 'center'
  }
});