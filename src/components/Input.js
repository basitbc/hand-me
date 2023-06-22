import React from 'react';
import {TextInput, StyleSheet, Platform} from 'react-native';
import {black, Shadow} from '../utils/Colors';
export default function Input({
  value,
  onChange,
  placeholder,
  width,
  height,
  keyboardType,
  secureTextEntry
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={
        keyboardType && (Platform.OS === 'android' ? 'numeric' : 'number-pad')
      }
      style={[
        styles.inputContainer,
        {width: width ? width : 300, height: height ? height : 50},
      ]}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // borderColor: black,
    // borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 4,
    paddingHorizontal:20,
    backgroundColor:'#E3E3E3'
  },
});
