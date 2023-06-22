import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import { BtnGroup } from '../../components/ButtonGroup';
import ProductCard from '../../components/ProductCard'
import { Orders, serviceCategory } from '../../constants/Constants';
import OrderList from '../../components/OrderList';


export default function Transaction() {
  const [selection, setSelection] = useState(1);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.subContainer}>
        <View style={styles.inputContainer}>
            <Text style={{color: 'black', fontSize: 22}}>Total Order</Text>
            <Text style={{color: 'black', fontSize: 32}}>₹ 8,000</Text>
        </View>

        <View>
        <View style={styles.btnGroup}>
      <TouchableOpacity
        style={[
          styles.btn,
          selection === 1 ? {backgroundColor: '#CE9528'} : null,
        ]}
        onPress={() => setSelection(1)}>
        <Text
          style={[styles.btnText, selection === 1 ? {color: 'white'} : null]}>
            Paid
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          selection === 2 ? {backgroundColor: '#CE9528'} : null,
        ]}
        onPress={() => setSelection(2)}>
        <Text
          style={[styles.btnText, selection === 2 ? {color: 'white'} : null]}>
          OutStanding
        </Text>
      </TouchableOpacity>
      </View>
        </View>
        <View>
            
        </View>

        <View />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {},
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  selector: {
    marginTop: 10,
    width: '78%',
    alignSelf: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:15,
    paddingVertical:15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#6B7280',
  },
  btn: {
    flex: 1,
    borderRightWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: '#6B7280',
    backgroundColor:'#595959',
    borderRadius:12,
    margin:5
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
    color:'#fff'
  },
});
