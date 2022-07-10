import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
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

const NativeStack = createNativeStackNavigator();
function GameStackNavigator() {
  return (
    <NativeStack.Navigator screenOptions={NativeStackNavigationScreenOptions}>
      <NativeStack.Screen 
      name="HomeIntro" 
      component={HomeIntroScreen}
      options={{ title: "Welcome Back!" }} />

      <NativeStack.Screen 
      name="HomeGame" 
      component={HomeGameScreen} 
      options={{
        title: "Game",
        headerBackImageSource: StopAppIcon
      }} />
    </NativeStack.Navigator>
  );
};

const AppBottomTabs = createBottomTabNavigator();
function App() {
  return (
    <>
     <StatusBar style="dark" />
   
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
          tabBarActiveTintColor: Colors.appTheme.darkgreen
        }} />
      </AppBottomTabs.Navigator> 
     </NavigationContainer>
    </>
  );
};

export default App;