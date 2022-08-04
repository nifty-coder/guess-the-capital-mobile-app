import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  fetchCountriesAndReturnRandomCountries, 
  fetchAnswers 
} from '../constants/Data';
import CountryCard from '../components/CountryCard';
import Answers from '../components/Answers';

function HomeGameScreen({ navigation, route }) {
  const [randomizedCountry, setRandomizedCountry] = useState();
  const [randomizedAnswers, setRandomizedAnswers] = useState();

  useEffect(() => {
    const subscription = navigation.addListener('focus', async () => {
      const countriesResult = await fetchCountriesAndReturnRandomCountries();
      setRandomizedCountry(countriesResult[0]);      
      
      const answersResult = await fetchAnswers(countriesResult);
      setRandomizedAnswers(answersResult);  
    });

   return subscription;
  }, [navigation]);

  const onAnswerClickHandler = async (answer) => {
    const correctAnswer = randomizedCountry.capital.map((cap) => cap); 
    const correct = answer.length === correctAnswer.length 
    && answer.every((value, index) => value === correctAnswer[index]);
    let buttons = [{
      text: "Play again",
      onPress: () => {
        navigation.navigate("HomeIntro");
      }
    }];

    if(correct) {
     let wins = await AsyncStorage.getItem("wins").then((res) => {
        if (res && res != 1) {
          return JSON.parse(res);
        } else return [];
     });

     if(!wins.includes(randomizedCountry)) {
      wins.push({ country: randomizedCountry, player: route.params.playerName });
      await AsyncStorage.setItem("wins", JSON.stringify(wins));
      navigation.navigate("GameVictory", { playerName: route.params.playerName }); 
     } else {
      Alert.alert(
        "Your wins includes the country " + randomizedCountry.name.common,
        "Please guess the capital of another country.",
        buttons
      );
     }
    } else {   
      Alert.alert(
        "Oops, you got that wrong!", 
        "Play again and you might as well get it right!", 
        buttons
      );
    }
  };

  function renderCountry() {
    const { 
      capital, 
      flag, 
      name, 
      population, 
      continents, 
      coatOfArms 
    } = randomizedCountry;
    
    return (
      <CountryCard
      player={route.params.playerName}
      wonGame={false}
      capital={capital}
      flag={flag} 
      name={name.common} 
      population={population}
      continents={continents}
      seal={coatOfArms} />
    );
  };

  function renderAnswers() {
    return randomizedAnswers.map((randomizedAnswer, i) => (
      <Answers
      key={i}
      index={i}
      randomizedAnswer={randomizedAnswer}
      onAnswerClickHandler={onAnswerClickHandler} />
    ));
  };

  return (
   <View>
    {randomizedCountry && renderCountry()}
    {randomizedAnswers && renderAnswers()}
   </View>
  );
};

export default HomeGameScreen;