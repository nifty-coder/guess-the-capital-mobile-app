import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';

function VictoryScreen({ navigation, route }) {
  const [uri, setUri] = useState('https://c.tenor.com/oGoY4h0pGYUAAAAj/updatess.gif');
  const [playerName, setPlayerName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ 
      title: "Game Over",
      headerLeft: () => (
       <Pressable 
       android_ripple={{ color: '#fff' }} 
       onPress={() => navigation.navigate("HomeGame", { playerName: playerName })}>
        <Ionicons name="arrow-back" size={24} />
       </Pressable> 
      ),
      headerRight: () => (
        <Pressable 
        android_ripple={{ color: '#fff' }} 
        onPress={() => navigation.navigate("HomeIntro")}>
         <Ionicons name="md-home" size={24} />
        </Pressable> 
      ) 
    });
  }, [navigation]);

  useEffect(() => {
    const link = (
     'https://i.ibb.co' +
     route.params.participationType === true 
     ? '/Wy8Z2bM/trophygtc.jpg' 
     : '/DtJtV7V/trophy.jpg'
    );  

    setTimeout(() => {
      setUri(link);
    }, 100);
    
    (async () => {
      let player = await AsyncStorage.getItem("player");
      setPlayerName(player);
    })();
  }, []);
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={styles.image} />
      <Text style={styles.text}>Great job, {playerName}!</Text>
      <CustomButton 
      disabled={false}
      style={styles.playAgainButton} 
      bgColor={Colors.appTheme.darkblue}
      textColor={Colors.white} 
      buttonText="Play another game"
      onPress={() => navigation.navigate("HomeGame")} />
 
      <View style={styles.buttonContainer}>
        <CustomButton 
        disabled={false}
        style={styles.homeButton}
        bgColor={Colors.appTheme.reddish} 
        textColor={Colors.white} 
        buttonText="Go back to Home" 
        onPress={() => navigation.navigate("HomeIntro")} />

        <CustomButton 
        disabled={false}
        style={styles.scoreSummaryButton} 
        bgColor={Colors.appTheme.darkgreen} 
        textColor={Colors.white} 
        buttonText={"Score Summary"}
        onPress={() => navigation.navigate("Score", { playerName: playerName })} />
      </View>
    </View>
  );
};

export default VictoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 300,
    height: 300
  },
  text: {
    fontSize: 20
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  playAgainButton: {
    width: 150,
    marginTop: 4  
  },
  homeButton: {
    width: 150,
    marginTop: 6
  },
  scoreSummaryButton: {
    width: 150,
    marginTop: 6,
    marginLeft: 2
  }
});