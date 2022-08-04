import { StyleSheet, Text, Pressable } from 'react-native';

const CustomButton = ({ onPress, style, textColor, label, buttonText }) => {
  return (
    <Pressable 
    android_ripple={{ color: '#fff' }} 
    onPress={onPress} 
    style={[style, styles.pressable]}>
      <Text style={[{ color: textColor }, styles.buttonText]}>{label} {buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    pressable: {
     borderRadius: 90,
     elevation: 10,
     borderWidth: 3,
     marginHorizontal: 66,
     height: 30
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 14.5
    }
});