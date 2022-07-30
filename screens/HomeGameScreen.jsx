import { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCountriesAndReturnRandomCountries, fetchAnswers } from '../constants/Data';
import Colors from '../constants/Colors';
import CountryJSX from '../components/jsx/CountryJSX';
import CustomButton from '../components/CustomButton';

function HomeGameScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [randomizedCountry, setRandomizedCountry] = useState();
  const [randomizedAnswers, setRandomizedAnswers] = useState();

  const loadData = async () => {
    setGameOver(false);
    if(!gameOver) {
      setRefreshing(true);
      const countriesResult = await fetchCountriesAndReturnRandomCountries();
      setRandomizedCountry(countriesResult[0]);      
      const answersResult = await fetchAnswers(countriesResult);
      setRandomizedAnswers(answersResult);
      setRefreshing(false);
    } else return;
  };
  useEffect(() => {
    loadData();
    return () => setGameOver(true);
  }, [gameOver]);

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

  return (
    <ScrollView 
    style={styles.container}
    refreshControl={      
     <RefreshControl refreshing={refreshing} onRefresh={loadData} />
    }>
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
    </ScrollView>
  );
};

export default HomeGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});