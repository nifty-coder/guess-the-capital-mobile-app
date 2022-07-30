import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';

function VictoryScreen({ navigation, route }) {
  const playerName = route.params.playerName;

  useLayoutEffect(() => {
    navigation.setOptions({ 
      title: "You Won!",
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
  
  return (
    <View style={styles.container}>
      <Image 
      source={{ uri: 'https://i.ibb.co/DtJtV7V/trophy.jpg' }} 
      style={styles.image} 
      />
      <Text style={styles.text}>Great job, {playerName}!</Text>
      
      <CustomButton 
      style={styles.playAgainButton} 
      textColor={Colors.white} 
      buttonText="Play again"
      onPress={() => navigation.navigate("HomeGame", { playerName })} 
      />

      <View style={styles.buttonContainer}>
        <CustomButton 
        style={styles.homeButton} 
        textColor={Colors.white} 
        buttonText="Go back to Home" 
        onPress={() => navigation.navigate("HomeIntro")}
        />

        <CustomButton 
        style={styles.myScoreAndWinsButton} 
        textColor={Colors.white} 
        buttonText={"My Wins & Score"}
        onPress={() => navigation.navigate("Wins",{playerName})}
        />
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
    backgroundColor: Colors.appTheme.darkblue,
    width: 100,
    marginTop: 4  
  },
  homeButton: {
    backgroundColor: Colors.appTheme.reddish,
    width: 100,
    marginTop: 6
  },
  myScoreAndWinsButton: {
    backgroundColor: Colors.appTheme.darkgreen,
    width: 100,
    marginTop: 6,
    marginLeft: 2
  }
});