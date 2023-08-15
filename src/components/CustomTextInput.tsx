import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PColors } from '../shared/Colors';

interface CustomTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="Black"
        underlineColorAndroid="transparent" 
      />
      <Feather name="search" size={24} color="#333" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: PColors.Black, 
    paddingVertical: 8,
    width:'90%'
  },
  input: {
    flex: 1,
    fontSize: 26,
    color: PColors.Black,
    marginLeft: 10, 
  },
  icon: {
    marginRight: 10, 
  },
});

export default CustomTextInput;
