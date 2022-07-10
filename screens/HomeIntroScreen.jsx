import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, TextInput, View } from 'react-native';

import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';

function HomeIntroScreen({ navigation }) {
  const [playerName, setPlayerName] = useState('');

  function playGameHandler() {
    if(
     (playerName.includes('<') && (playerName.includes('/>') || playerName.includes('>'))) 
    || (playerName.trim() === '')) {
      Alert.alert("Invalid Name Text", "Enter proper name.");
      setPlayerName('');
      return;
    }

    navigation.navigate("HomeGame", { playerName });
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
      <CustomButton buttonText="Play Game" onPress={playGameHandler} />
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