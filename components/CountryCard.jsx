import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { commafyNumber } from 'commafy-any-number';
import { getContinentMap } from '../constants/Data';
import Colors from '../constants/Colors';

const CountryCard = ({ 
  player, wonGame, capital, flag, name, population, continents, seal 
}) => {
  const continentMapLink = getContinentMap(continents[0]);
  const sealObj = seal && Object.keys(seal).length;
  const emblemUri = sealObj !== 0 && seal?.png;
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
    <View style={[styles.card, capital.length > 1 ? { height: 142 } : { height: 133 }]}>
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
        {capital.length > 1 ? (
          <>
           <Text>Capital:</Text>
           <Text>{capital.join(", ")}</Text>
          </>
        ) : <Text>Capital: {capital.join(", ")}</Text>
        }
        
        <Text>Winner: {player}</Text>
       </>
      )}
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
    borderRadius: 8,
    borderColor: Colors.appTheme.blue,
    borderWidth: 2
   },
   flag: {
    marginTop: 5,
    marginLeft: 2,
    marginRight: 7,
    fontSize: 66
   },
   countryDetails: {
    marginTop: -8,
    alignItems: 'center'
   },
   name: {
    fontSize: 18,
    marginTop: 25
   },
   seal: {
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 10,
    width: 100
   }
});