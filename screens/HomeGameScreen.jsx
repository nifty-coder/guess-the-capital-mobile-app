import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
// import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCountriesAndReturnRandomCountries, fetchAnswers } from '../constants/Data';
import Colors from '../constants/Colors';
import CountryCard from '../components/CountryCard';
import CustomButton from '../components/CustomButton';
import { isScreenInFocus } from '../constants/NavigationScreenOptions';

function HomeGameScreen({ navigation, route }) {
 // const focused = useIsFocused();
  const [gameOver, setGameOver] = useState(false);
  const [randomizedCountry, setRandomizedCountry] = useState();
  const [randomizedAnswers, setRandomizedAnswers] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setGameOver(false);
      const loadData = async () => {
        if(!gameOver) {
          const countriesResult = await fetchCountriesAndReturnRandomCountries();
          setRandomizedCountry(countriesResult[0]);      
          const answersResult = await fetchAnswers(countriesResult);
          setRandomizedAnswers(answersResult);
        } else return;
      };
      loadData();  
    });

    return unsubscribe;
  }, [navigation]);

  const onAnswerClickHandler = async (answer) => {
   const correctAnswer = randomizedCountry.capital.map((cap) => cap); 
   const correct = answer.length === correctAnswer.length 
   && answer.every((value, index) => value === correctAnswer[index]);
 
    if(correct) {
     let wins = await AsyncStorage.getItem("wins").then((res) => {
        if (res && res != 1) {
          return JSON.parse(res);
        } else return [];
     });

     if(!wins.includes(randomizedCountry)) {
      wins.push({ country: randomizedCountry, player: route.params.playerName });
      await AsyncStorage.setItem("wins", JSON.stringify(wins));
      setGameOver(true);
      navigation.navigate("GameVictory", { playerName: route.params.playerName }); 
     } else {
      setGameOver(true);
     }
    } else {
      Alert.alert(
        "Oops, you got that wrong!", 
        "Play again and you might as well get it right!", 
        [{
          text: "Okay",
          onPress: () => {
            setGameOver(false);
            navigation.navigate("HomeIntro");
          }
        }]
      );
    }
  };

  function renderCountry() {
    const { capital, flag, name, population, continents, coatOfArms } = randomizedCountry;
    console.log(coatOfArms);
    return (
      <CountryCard
      player={route.params.playerName}
      wonGame={gameOver}
      capital={capital}
      flag={flag} 
      name={name.common} 
      population={population}
      continents={continents}
      seal={coatOfArms}
      />
    );
  };

  return (
    <View style={styles.container}>
     {randomizedCountry && renderCountry()}
     {randomizedAnswers && randomizedAnswers.map((randomizedAnswer, i) => (
      <View key={i} style={{ marginBottom: 15, borderRadius: 5 }}>
       <CustomButton 
       style={{ backgroundColor: Colors.appTheme.reddish }}
       textColor={Colors.white}
       buttonText={randomizedAnswer} 
       onPress={() => onAnswerClickHandler(Array.of(randomizedAnswer))} />
      </View>
     ))}
    </View>
  );
};

export default HomeGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});