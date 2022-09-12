import { useContext, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import BadWordsList from 'badwords-list';
import BadWordsFilter from 'bad-words';
import HindiBadWordsFilter from 'profanity-hindi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameContext } from '../utils-async/Context';
import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';
import introToGameList from '../constants/IntroToGame';

const HomeIntroScreen = ({ navigation }) => {
  const worldMapURL = 'https://tinyurl.com/sk-app-world-map';
  const { playerName, updatePlayerName } = useContext(GameContext);
  const [player, setPlayer] = useState('');
  let EnglishBadWordsFilter = new BadWordsFilter(BadWordsList.array);
  let playerFitOrNotForSubmission = (
    (player.includes('<') || (player.includes('/>'))) 
    || (player.includes('>')) || (player.trim() === '') 
    || (EnglishBadWordsFilter.isProfane(player)) 
    || (HindiBadWordsFilter.isMessageDirty(player))
  );

  const playGameHandler = async () => {
   await AsyncStorage.setItem("player", player);
   updatePlayerName(player);
   navigation.navigate("Home", { screen: "HomeGame", initial: true });
   setPlayer('');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: worldMapURL }} style={styles.worldImage} />
      <Text style={styles.introText}>Let's go on a world tour!</Text>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input}
        placeholder="Enter Player Name"
        placeholderTextColor={Colors.white}
        value={player} 
        maxLength={15}
        onChangeText={(text) => setPlayer(text)} />
      </View>
      
      <CustomButton 
      fontSize={18}
      disabled={playerFitOrNotForSubmission}
      bgColor={Colors.black}
      textColor={Colors.appTheme.orange}
      buttonText="Play Game" 
      onPress={playGameHandler} />

      <Text style={styles.introText}>About Our Game:</Text>
      {introToGameList.map(
        ((line, i) => (
         <Text key={i} style={{ textAlign: 'center', marginTop: 4 }}>
          {i + 1}. {line}
          </Text>
         )
        )
      )}
      <Text style={styles.developerText}>Game developed by Surya Kasibhatla.</Text>
    </View>
  );
};

export default HomeIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  worldImage: {
    width: 430,
    height: 220,
    alignSelf: 'center',
    marginTop: 8
  },
  introText: {
    marginTop: '1%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputContainer: {
    height: '10%',
    paddingHorizontal: 4,
    paddingTop: Dimensions.get('window').width * 0.01,
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
  },
  developerText: {
    marginTop: '10%',
    textAlign: "center",
    fontSize: 16
  }
});