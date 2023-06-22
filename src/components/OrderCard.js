import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Shadow, White} from '../utils/Colors';
export default function Card({children, customStyle}) {
  return <View style={[styles.Card, customStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  Card: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D9D5EC',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 25,
    paddingHorizontal: 16,
    marginBottom: 3,
    marginHorizontal: 16,
    paddingVertical: 18,
  },
});
