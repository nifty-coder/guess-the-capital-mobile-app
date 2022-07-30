import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, TextInput, View } from 'react-native';
import BadWordsList from 'badwords-list';
import BadWordsFilter from 'bad-words';
import HindiBadWordsFilter from 'profanity-hindi';
import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';

function HomeIntroScreen({ navigation }) {
  const [playerName, setPlayerName] = useState('');
 
  function playGameHandler() {
    let EnglishBadWordsFilter = new BadWordsFilter(BadWordsList.array);
    if(
      (playerName.includes('<') && (playerName.includes('/>') 
      || playerName.includes('>'))) || (playerName.trim() === '')
      || (EnglishBadWordsFilter.isProfane(playerName)) 
      || (HindiBadWordsFilter.isMessageDirty(playerName))
    ) {
      Alert.alert("Invalid Name!", "Enter a proper name.", [{ text: 'Okay' }]);
      setPlayerName('');
      return;
    }

    navigation.navigate("HomeGame", { playerName });
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
      style={{ backgroundColor: Colors.black }}
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
    paddingTop: Dimensions.get('window').width * 0.65,
    paddingBottom: Dimensions.get('window').width * 0.2
  },
  input: {
    backgroundColor: Colors.appTheme.darkgreen,
    textAlign: "center",
    color: Colors.white,
    height: 70,
    paddingLeft: 15,
    paddingRight: 15
  }
});