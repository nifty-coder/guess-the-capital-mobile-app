import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Pressable, Text, View, BackHandler } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFetchRandomCountries, fetchAnswers } from '../constants/Data';
import Colors from '../constants/Colors';
import CountryCard from '../components/CountryCard';
import Answers from '../components/Answers';

const HomeGameScreen = ({ navigation }) => {
  const { fetchRandomCountries } = useFetchRandomCountries();
  const [playerName, setPlayerName] = useState();
  let name;
  const [randomizedCountry, setRandomizedCountry] = useState({});
  const [randomizedAnswers, setRandomizedAnswers] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [wonText, setWonText] = useState('');
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [numberOfGames, setNumberOfGames] = useState();
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  let correctAnsCt = numberOfCorrectAnswers;
  
  const loadData = async () => {
    let numGames = await AsyncStorage.getItem("numGames").then((res) => {
      if (res) {
        return +res;
      } else return 1;
    });    
    setNumberOfGames(numGames);
    
    const countriesResult = fetchRandomCountries();
    setRandomizedCountry(countriesResult[0]);      

    const answersResult = fetchAnswers(countriesResult);
    setRandomizedAnswers(answersResult);  

    setNumberOfAttempts((prevNumber) => { 
      switch(isQuestionAnswered) {
        case true:
         return prevNumber + 1;
        case false:
          if(prevNumber == 0 || prevNumber == 1) {
           return prevNumber + 1;
          } else return prevNumber;
        default:
         return prevNumber;
      }
    });
    
    setDisabled(false);
    setIsCorrect(false);
    setWonText('');
  };

  useEffect(() => {
   const unsubscribe = (() => {
     const subscription = navigation.addListener('focus', async () => {  
      let player = await AsyncStorage.getItem("player");
      name = player;
      setPlayerName(player);
      await loadData();
    });

    return subscription;
   })();
     
   return () => {
    unsubscribe();
    setRandomizedCountry({});
    setRandomizedAnswers([]);
    setWonText('');
   };
  }, [navigation]);

  useLayoutEffect(() => {
    const exitApp = async () => {
      BackHandler.exitApp();
    };

    const clearData = async () => {
      const keys = ['player', 'numAttempts', 'numGames', 'gameHistory'];
      await AsyncStorage.multiRemove(keys, (err) => {
        if(!err) {
          setTimeout(() => {
          navigation.navigate("Home", { screen: "HomeIntro", initial: true });
          }, 1000);    
        } else {
          Alert.alert("Something went wrong!", "Please try again.", [{ text: 'Okay' }]);
        }
      });
    };

    navigation.setOptions({
      title: "Guess The Capital",
      headerLeft: () => (
        <Pressable android_ripple={{ color: '#fff' }} onPress={exitApp}>
          <Ionicons 
          style={{ alignSelf: 'center' }} 
          name="close-circle" 
          size={36} 
          color="black" 
          />
          <Text style={{ textAlign: 'center' }}>Exit App</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable 
        android_ripple={{ color: '#fff' }} 
        onPress={clearData}>
          <AntDesign 
          style={{ alignSelf: 'center' }} 
          name="deleteuser" 
          size={36} 
          color="black" 
          />
          <Text style={{ textAlign: 'center' }}>{name}</Text>
        </Pressable>
      )
    });
  }, [navigation]);
  
  const checkIfGameDone = async (numAtts) => {
    if (numAtts % 10 === 0) {
      let gameHistory = await AsyncStorage.getItem("gameHistory").then((res) => {
        if(res && res !== 1) {
          return JSON.parse(res);
        } else return [];
      });
    
      let gameData = {
        gameNum: numberOfGames,
        correctAns: correctAnsCt,
        wrongAns: correctAnsCt === 10 ? 0 : 10 - correctAnsCt
      };
      gameHistory.push(gameData);
      await AsyncStorage.setItem("gameHistory", JSON.stringify(gameHistory));
      await AsyncStorage.setItem("numGames", JSON.stringify(numberOfGames + 1));
      
      setNumberOfCorrectAnswers(0); 
      setTimeout(() => {
        navigation.navigate(
          "GameVictory", 
          { 
            participationType: correctAnsCt === 10 ? false : true 
          }
        );
        setNumberOfAttempts(0);  
      }, 1500);
    } else {
      setTimeout(() => {
       loadData();
      }, 1500);
    } 
  };

  const onAnswerClickHandler = async (answer) => {
    const correctAnswer = randomizedCountry.capital.map((cap) => cap); 
    const correct = answer.length === correctAnswer.length 
    && answer.every((value, index) => value === correctAnswer[index]);
 
    setIsQuestionAnswered(true);

    if(correct) {
     setDisabled(true); 
     setIsCorrect(true);  
     correctAnsCt++;
     setNumberOfCorrectAnswers((prevNumber) => { 
        switch(correct) {
          case true:
           return prevNumber + 1;
          case false:
            return prevNumber;
          default:
          return prevNumber;
        }
      });
     setWonText(`Woohoo! Good job, ${playerName}!`);
     await checkIfGameDone(numberOfAttempts);
    } else {   
      setDisabled(true);
      setIsCorrect(false);

      setWonText(`Oops, it is wrong! Correct answer is ${correctAnswer}.`);
      await checkIfGameDone(numberOfAttempts);
    }
  };
  
  const renderCountry = () => {
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
      player={playerName}
      capital={capital}
      flag={flag} 
      name={name.common} 
      population={population}
      continents={continents}
      seal={coatOfArms} />
    );
  };

  const renderAnswers = () => {
    return randomizedAnswers.map((randomizedAnswer, i) => (
      <Answers
      key={i}
      index={i}
      disabled={disabled}
      randomizedAnswer={randomizedAnswer}
      onAnswerClickHandler={onAnswerClickHandler} />
    ));
  };

  let messageColor = isCorrect ? Colors.appTheme.darkgreen : Colors.appTheme.red;

  return (
   <View>
    <Text style={[styles.text, styles.questionText]}>
      Question {numberOfAttempts === 0 ? 1 : numberOfAttempts} of 10
    </Text>
    {JSON.stringify(randomizedCountry) !== "{}" && renderCountry()}
    <Text style={[styles.text, { color: messageColor }]}>
      {wonText}
    </Text>
    {JSON.stringify(randomizedAnswers) !== "[]" && renderAnswers()}    
   </View>
  );
};

export default HomeGameScreen;

const styles = StyleSheet.create({
  text: { 
    fontSize: 15, 
    textAlign: "center",
    marginTop: -15,   
    marginBottom: 4 
  },
  questionText: { 
    marginTop: 10,
    marginRight: 22, 
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold'
  }
});