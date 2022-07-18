import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { fetchCountriesAndReturnRandomCountry } from '../constants/Data';
import CountryJSX from '../components/jsx/CountryJSX';

function HomeGameScreen({ navigation, route }) {
  const [randomizedCountry, setRandomizedCountry] = useState();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (gameOver === false) {
        const result = await fetchCountriesAndReturnRandomCountry();
        setRandomizedCountry(result);
      }
      
      return;
    };

    loadData();
  }, [gameOver, fetchCountriesAndReturnRandomCountry]);

  return (
    <View style={styles.container}>
     {randomizedCountry && <CountryJSX randomizedCountry={randomizedCountry} />}
    </View>
  );
};

export default HomeGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});