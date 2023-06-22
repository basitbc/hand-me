import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Logo from '../assets/logo.png'
import { White } from '../utils/Colors';

export default function Header({navigation, isBack, isBackTitle, backTitle}) {
  function handleOnBackPress() {
    navigation.goBack();
  }
  return (
    <View style={styles.headerContainer}>
       <Image source={Logo} style={styles.Logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    marginTop: 10,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: White
  },
  backStyle: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '700'
  },
  midContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  leftHeader: {
    flexDirection: 'row',
  },
  Logo:{
    width: '10%',
    height: 100
  }
});
