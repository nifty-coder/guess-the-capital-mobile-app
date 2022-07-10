import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const headerStyles = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.appTheme.orange
    }
};

const BottomTabsNavigationScreenOptions = ({ route }) => ({
    ...headerStyles,
    tabBarStyle: {
      position: 'absolute',
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

const NativeStackNavigationScreenOptions = {
  ...headerStyles,  
};
export {
    BottomTabsNavigationScreenOptions,
    NativeStackNavigationScreenOptions
};