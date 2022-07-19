import { StyleSheet, Text, Pressable } from 'react-native';
import Colors from '../constants/Colors';

const CustomButton = ({ onPress, style, buttonText }) => {
  return (
    <Pressable 
    android_ripple={{ color: '#fff' }} 
    onPress={onPress} 
    style={[style, styles.pressable]}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    pressable: {
     borderRadius: 90,
     elevation: 5,
     borderWidth: 1,
     marginHorizontal: 66
    },
    buttonText: {
      textAlign: 'center',
      color: Colors.appTheme.orange
    }
});