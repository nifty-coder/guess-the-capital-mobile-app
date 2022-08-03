import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const defaultStyles = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.appTheme.orange
    }
};

const BottomTabsNavigationScreenOptions = ({ route }) => ({
    ...defaultStyles,
    unmountOnBlur: true,
    tabBarStyle: {
      borderTopColor: 'rgba(0, 0, 0, .2)',    
      backgroundColor: Colors.appTheme.orange
    },
    tabBarLabelStyle: { fontSize: 14 },
    tabBarInactiveTintColor: Colors.black,
    tabBarIcon: ({ focused, color }) => {
      let iconName;
  
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Wins') {
        iconName = focused ? 'flag' : 'flag-outline';
      }

     return (
      <Ionicons 
      name={iconName}
      color={color}
      size={24} />
    );
   }
});

const NativeStackNavigationScreenOptions = defaultStyles;

// const isScreenInFocus = (navigation) => {
//   let isFocused = navigation.isFocused();

//   // useEffect(() => {
//     const didBlur = () => isFocused = false;
//     const didFocus = () => isFocused = true;

//     const blurSubscription = navigation.addListener('didBlur', didBlur);
//     const focusSubscription = navigation.addListener('didFocus', didFocus);
    
//     // return () => {
//     //   blurSubscription.remove();
//     //   focusSubscription.remove();
//     // };
//   // }, []);
  
//   return isFocused;
// };

export {
  BottomTabsNavigationScreenOptions,
  NativeStackNavigationScreenOptions,
  // isScreenInFocus
};