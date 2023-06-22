import React from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Shadow} from '../utils/Colors';
export default function SearchBar({
  value,
  onChange,
  placeholder,
  width,
  height,
}) {
  return (
    <View style={styles.searchBoxContainer}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[
          styles.inputContainer,
          {width: width ? width : 300, height: height ? height : 50},
        ]}
      />
      <TouchableOpacity>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: Shadow,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
