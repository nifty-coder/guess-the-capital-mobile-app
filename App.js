import { StatusBar } from 'expo-status-bar';
import { Image, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { 
  BottomTabsNavigationScreenOptions, 
  NativeStackNavigationScreenOptions 
} from './constants/NavigationScreenOptions';
import StopAppIcon from './assets/stop-app-icon.png';
import Colors from './constants/Colors';

import HomeIntroScreen from './screens/HomeIntroScreen';
import HomeGameScreen from './screens/HomeGameScreen';
import WinsScreen from './screens/WinsScreen';
import VictoryScreen from './screens/VictoryScreen';

const NativeStack = createNativeStackNavigator();
function GameStackNavigator() {
  const navigation = useNavigation();

  return (
    <NativeStack.Navigator screenOptions={NativeStackNavigationScreenOptions}>
      <NativeStack.Screen 
      name="HomeIntro" 
      component={HomeIntroScreen}
      options={{ title: "Welcome!" }} />

      <NativeStack.Screen 
      name="HomeGame" 
      component={HomeGameScreen} 
      options={{
        title: "Guess The Capital",
        headerLeft: () => (
         <Pressable android_ripple={{ color: '#fff' }} onPress={navigation.goBack}>
          <Image 
          source={StopAppIcon} 
          style={{ height: 75, width: 80, marginBottom: 4 }}
          />
         </Pressable> 
        )
      }} />

      <NativeStack.Screen
      name="GameVictory"
      component={VictoryScreen} /> 
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
        name="Wins" 
        component={WinsScreen}
        options={{
          title: 'Your Wins',
          tabBarActiveTintColor: Colors.appTheme.darkgreen,
          playerName: ''
        }} />
      </AppBottomTabs.Navigator> 
     </NavigationContainer>
    </>
  );
};

export default App;