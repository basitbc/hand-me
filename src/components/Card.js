import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Shadow, White} from '../utils/Colors';
export default function Card({children, customStyle}) {
  return <View style={[styles.Card, customStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  Card: {
    // height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: White,
    borderRadius: 15,
    shadowColor: Shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 18,
    paddingBottom: 18,
  },
});
