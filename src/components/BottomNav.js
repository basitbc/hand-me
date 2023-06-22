import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Home from '../assets/home.png';
import explore from '../assets/explore.png';
import Add from '../assets/add.png';
import Account from '../assets/account.png';
import Notify from '../assets/bell.png';
import {Shadow, White} from '../utils/Colors';
export default function BottomNav() {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.propertyContainer}>
        <Image source={Home} style={styles.Icon} resizeMode="contain" />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.propertyContainer}>
        <Image
          source={explore}
          style={styles.ExploreIcon}
          resizeMode="contain"
        />
        <Text style={styles.text}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.propertyContainer}>
        <Image
          source={Add}
          style={[styles.Icon, {width: '100%'}]}
          resizeMode="contain"
        />
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.propertyContainer}>
        <Image source={Notify} style={styles.NotifyIcon} resizeMode="contain" />
        <Text style={styles.text}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.propertyContainer}>
        <Image source={Account} style={styles.ProfIcon} resizeMode="contain" />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    // flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: Shadow,
    borderTopWidth: 1,
    padding: 5,
    backgroundColor: White,
    // marginTop: 20
  },
  propertyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  Icon: {
    width: '50%',
    height: 30,
  },
  ExploreIcon: {
    width: '40%',
    height: 30,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  NotifyIcon: {
    width: '30%',
    height: 30,
  },
  ProfIcon: {
    width: '60%',
    height: 30,
  }
});
