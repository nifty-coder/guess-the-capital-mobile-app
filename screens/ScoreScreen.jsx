import { useEffect, useLayoutEffect, useState } from 'react';
import { 
  RefreshControl, 
  StyleSheet, 
  Pressable, 
  Text, 
  Image, 
  View, 
  FlatList, 
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import LoadingGif from '../assets/loadingWins.gif';
import ScoreCard from '../components/ScoreCard';

function ScoreScreen({ navigation }) {  
  let refreshing = false;
  let data, player;
  const [gameHistory, setGameHistory] = useState([]);
  const [user, setUser] = useState();

  useLayoutEffect(() => {
    const clearData = async () => {
      Alert.alert(
        "Are you sure?", 
        "This will remove your game history but still keep your name.",
        [
          { text: 'No' },
          {
            text: 'Yes',
            onPress: async () => {
              await AsyncStorage.removeItem("gameHistory"); 
              setGameHistory(null);        
            }
          }
        ]
      ); 
    };
      navigation.setOptions({
        headerRight: () => (
          <Pressable 
          style={{ marginRight: 15 }}
          android_ripple={{ color: '#fff' }} 
          onPress={clearData}>
           <MaterialIcons 
           style={{ alignSelf: 'center' }} 
           name="delete-forever" 
           size={32} 
           color="black"
           />
          <Text style={{ textAlign: 'center' }}>Clear Games</Text>
          </Pressable> 
        )
      });
  }, [navigation]);

  const loadAsyncStorageData = async () => {
    refreshing = true;
    data = await AsyncStorage.getItem("gameHistory").then((res) => {
      return JSON.parse(res);
    }); 
    player = await AsyncStorage.getItem("player");
    refreshing = false;
  };
  useEffect(() => {
   loadAsyncStorageData()
    .then(() => {
      setGameHistory(data);
      setUser(player);
    }).catch((err) => {
     return Alert.alert(
      "Something went wrong!", 
      "Please try again later.", 
      [{ text: 'Okay', onPress: () => navigation.navigate("Home") }]
     );
    });
      
    return () => setGameHistory(null);
  }, [data]);

  function renderGameHistory(gmh, i) {
    const { gameNum, correctAns, wrongAns } = gmh;
    
    return (
     <>
      <ScoreCard key={i} gnum={gameNum} correctAns={correctAns} wrongAns={wrongAns} /> 
      <View style={styles.divider} />
      </>
    );
   };
  
  const jsx = () => {
    refreshing = true;
    if(gameHistory) {
      refreshing = false;
      return (
        <>
         <Text style={styles.text}>Here is your score summary, {user}:</Text>
         <FlatList 
         data={gameHistory}
         renderItem={({ item, index }) => renderGameHistory(item, index)} 
         refreshing={refreshing}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadAsyncStorageData} />
        } />
         <Text style={styles.text}>That's it so far!</Text>
        </>
      );
    } else {
      refreshing = false;
      return <Image source={LoadingGif} style={styles.loadingGif} />;
    }
  };

  return <>{jsx()}</>;
};

export default ScoreScreen;

const styles = StyleSheet.create({
  loadingGif: {
    marginTop: 16,
    alignSelf: 'center'
  },
  text: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic'
  },
  divider: {
    borderBottomColor: Colors.appTheme.orange,
    borderBottomWidth: 2
  }
});