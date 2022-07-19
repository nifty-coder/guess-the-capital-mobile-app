import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { commafyNumber } from 'commafy-any-number';
import { getContinentMap } from '../constants/Data';
import Colors from '../constants/Colors';

const CountryCard = ({ wonGame, flag, name, population, continents, seal }) => {
  const continentMapLink = getContinentMap(continents[0]);
  const emblemUri = Object.keys(seal).length !== 0 && seal.png;
  const [preFetchedUri] = useState(emblemUri);
  const loadingGifLink = 'https://c.tenor.com/oGoY4h0pGYUAAAAj/updatess.gif';
  const [emblemOrMapUri, setEmblemOrMapUri] = useState(loadingGifLink);

  useEffect(() => { 
    const valueToSet = !emblemUri ? continentMapLink : preFetchedUri;
    setTimeout(() => {
      setEmblemOrMapUri(valueToSet);
    }, 1000);
  }, []);

  return (
    <View style={styles.card}>
     <Text style={styles.flag}>{flag}</Text>

     <View style={styles.countryDetails}>
      <Text style={styles.name}>{name}</Text>
      <Text>Population: {commafyNumber(population)}</Text>
      <Text>
       {continents[0] === "Oceania" ? "Region: " : "Continent: "} 
       {name === "Russia" ? "Eurasia" : continents[0]}
      </Text>
     </View>

     <Image 
     source={{ uri: emblemOrMapUri }} 
     style={styles.seal} 
     resizeMode="contain" />  
    </View>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 16,
    backgroundColor: Colors.white,
    width: Dimensions.get("screen").width - 5,
    height: 130,
    borderRadius: 8,
    borderColor: Colors.appTheme.blue,
    borderWidth: 3
   },
   flag: {
    marginTop: 5,
    marginRight: 7,
    fontSize: 66
   },
   countryDetails: {
    alignItems: 'center'
   },
   name: {
    fontSize: 18,
    marginTop: 25
   },
   seal: {
    marginLeft: 10,
    width: 100
   }
});