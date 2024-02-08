import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Shadow, ThemeColor} from '../utils/Colors';
export default function Button({
  children,
  onPress,
  onLongPress,
  width,
  height,
  backgroundColor,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          width: width ? width : 250,
          height: height ? height : 40,
          backgroundColor: backgroundColor,
          display:'flex',
          flexDirection:'row'
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: Shadow,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColor,
    marginBottom:20
  },
});
