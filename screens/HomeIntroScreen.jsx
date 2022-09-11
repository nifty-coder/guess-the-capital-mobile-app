import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import BadWordsList from 'badwords-list';
import BadWordsFilter from 'bad-words';
import HindiBadWordsFilter from 'profanity-hindi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';

const HomeIntroScreen = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  let EnglishBadWordsFilter = new BadWordsFilter(BadWordsList.array);
  let playerNameFitOrNotForSubmission = (
    (playerName.includes('<') || (playerName.includes('/>'))) 
    || (playerName.includes('>')) || (playerName.trim() === '') 
    || (EnglishBadWordsFilter.isProfane(playerName)) 
    || (HindiBadWordsFilter.isMessageDirty(playerName))
  );

  const playGameHandler = async () => {
   await AsyncStorage.setItem("player", playerName);
   navigation.navigate("Home", { screen: "HomeGame", initial: true });
   setPlayerName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input}
        placeholder="Enter Player Name"
        placeholderTextColor={Colors.white}
        value={playerName} 
        onChangeText={(text) => setPlayerName(text)} />
      </View>
      
      <CustomButton 
      fontSize={18}
      disabled={playerNameFitOrNotForSubmission}
      bgColor={Colors.black}
      textColor={Colors.appTheme.orange}
      buttonText="Play Game" 
      onPress={playGameHandler} />
    </View>
  );
};

export default HomeIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    height: 70,
    paddingHorizontal: 4,
    paddingTop: Dimensions.get('window').width * 0.55,
    paddingBottom: Dimensions.get('window').width * 0.2
  },
  input: {
    backgroundColor: Colors.appTheme.darkgreen,
    textAlign: "center",
    color: Colors.white,
    fontSize: 18,
    height: 70,
    paddingLeft: 15,
    paddingRight: 15
  }
});