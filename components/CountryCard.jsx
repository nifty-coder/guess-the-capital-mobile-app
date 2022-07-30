import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { commafyNumber } from 'commafy-any-number';
import { getContinentMap } from '../constants/Data';
import Colors from '../constants/Colors';

const CountryCard = ({ 
  player, wonGame, capital, flag, name, population, continents, seal 
}) => {
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

  let cmpStyles = wonGame ? styles.winsScreenDisplay : styles.gameScreenDisplay;

  return (
    <View style={[styles.card, cmpStyles]}>
     <Text style={styles.flag}>{flag}</Text>
    
     <View style={styles.countryDetails}>
      <Text style={styles.name}>
        {name === "Saint Vincent and the Grenadines" 
        ? "St. Vincent & Grenadines" 
        : name}
      </Text>  
      <Text>Population: {commafyNumber(population)}</Text>
      <Text>
       {continents[0] === "Oceania" ? "Region: " : "Continent: "} 
       {name === "Russia" ? "Eurasia" : continents[0]}
      </Text>
      {wonGame && (
       <>
       <Text>Capital: {capital.join(", ")}</Text>
       <Text>Winner: {player}</Text>
       </>
      )}
    </View>

    <Image source={{ uri: emblemOrMapUri }} style={styles.seal} /> 
  </View>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width - 45,
    alignSelf: 'center',
    alignItems: 'center',    
    marginVertical: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderColor: Colors.appTheme.blue,
    borderWidth: 2
  },
  gameScreenDisplay: {
    height: 330
  },
  winsScreenDisplay: {
    height: 420
  },
  flag: {
   fontSize: 50
  },
  countryDetails: {
   alignItems: 'center'
  },
  name: {
   fontSize: 18
  },
  seal: {
   width: 200,
   height: '58%'
  }
});