import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAnswers, fetchCountriesAndReturnRandomCountry } from '../constants/Data';
import Colors from '../constants/Colors';
import CountryJSX from '../components/jsx/CountryJSX';
import CustomButton from '../components/CustomButton';

function HomeGameScreen({ navigation, route }) {
 const [gameOver, setGameOver] = useState(false);
  const [randomizedCountry, setRandomizedCountry] = useState();
  const [randomizedAnswers, setRandomizedAnswers] = useState();

  useEffect(() => {
    setGameOver(false);
    const loadData = async () => {
      if (!gameOver) {
        const result = await fetchCountriesAndReturnRandomCountry();
        setRandomizedCountry(result);
        
        const answersResult = await fetchAnswers(result);
        setRandomizedAnswers(answersResult);
      } else return;
    };
    loadData();
  }, [gameOver, fetchCountriesAndReturnRandomCountry, fetchAnswers]);

  const onAnswerClickHandler = async (answer) => {
   const correctAnswer = randomizedCountry.capital.map((cap) => cap); 
   const correct = answer.every((value, index) => value === correctAnswer[index]);
 
    if(correct) {
     let wins = await AsyncStorage.getItem("wins").then((res) => {
        if (res && res != 1) {
          return JSON.parse(res);
        } else return [];
     });

     if(!wins.includes(randomizedCountry)) {
      wins.push({ country: randomizedCountry, player: route.params.playerName });
      await AsyncStorage.setItem("wins", JSON.stringify(wins));
     }

     setGameOver(true);
     navigation.navigate("GameVictory", { playerName: route.params.playerName });
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

  return (
    <View style={styles.container}>
     {randomizedCountry && <CountryJSX
      player={route.params.playerName}
      wonGame={gameOver}
      capital={randomizedCountry.capital}
      randomizedCountry={randomizedCountry} />}

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