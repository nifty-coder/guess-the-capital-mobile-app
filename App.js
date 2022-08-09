import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  BottomTabsNavigationScreenOptions, 
  NativeStackNavigationScreenOptions 
} from './constants/NavigationScreenOptions';
import Colors from './constants/Colors';
import HomeIntroScreen from './screens/HomeIntroScreen';
import HomeGameScreen from './screens/HomeGameScreen';
import WinsScreen from './screens/WinsScreen';
import VictoryScreen from './screens/VictoryScreen';

const NativeStack = createNativeStackNavigator();
function GameStackNavigator() {
  const [enteredPlayerName, setEnteredPlayerName] = useState();
  useEffect(() => {
    const loadPlayer = async () => {
      let player = await AsyncStorage.getItem("player");
      setEnteredPlayerName(player);
    };  
    loadPlayer();
  });

  return (
    <NativeStack.Navigator 
    screenOptions={NativeStackNavigationScreenOptions}
    initialRouteName={!enteredPlayerName ? "HomeIntro" : "HomeGame"}>
      <NativeStack.Screen 
      name="HomeIntro" 
      component={HomeIntroScreen}
      options={{ 
        title: "Welcome!",
        headerBackVisible: false 
      }} />
      <NativeStack.Screen name="HomeGame" component={HomeGameScreen} />
      <NativeStack.Screen name="GameVictory" component={VictoryScreen} /> 
    </NativeStack.Navigator>
  );
};

function ScoreStackNavigator() {
  return (
    <NativeStack.Navigator screenOptions={NativeStackNavigationScreenOptions}>
      <NativeStack.Screen name="Wins" component={WinsScreen} />
    </NativeStack.Navigator>
  );
};

const AppBottomTabs = createBottomTabNavigator();
function App() {
  return (
    <>
     <StatusBar translucent backgroundColor="transparent" style="dark" />
     <NavigationContainer>
      <AppBottomTabs.Navigator screenOptions={BottomTabsNavigationScreenOptions}>
        <AppBottomTabs.Screen 
        name="Home" 
        component={GameStackNavigator}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.appTheme.reddish
        }} />

        <AppBottomTabs.Screen 
        name="Score" 
        component={ScoreStackNavigator}
        options={{
          unmountOnBlur: true,
          title: 'Score Summary',
          tabBarActiveTintColor: Colors.appTheme.darkgreen,
          headerShown: false
        }} />
      </AppBottomTabs.Navigator> 
     </NavigationContainer>
    </>
  );
};

export default App;