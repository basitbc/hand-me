import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function FavList({
  navigation,
  image,
  productname,
  productprice,
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={{ flex: 0.3 }}>
        <Image
          source={require('../assets/product.png')}
          resizeMode="contain"
          style={styles.productImg}
        />
      </View>
      <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View><Text style={styles.titleText}>{productname}</Text></View>
        <View><Text style={styles.contentText}>{'$' + productprice}</Text></View>
      </View>
      <View style={{ flex: 0.1, alignItems: 'flex-end', justifyContent: 'center', }}>
        <View>
          <Ionicons name={'chevron-forward-sharp'} size={30} color={'#000'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    marginVertical: 4
  },
  productImg: {
    width: 100,
    height: 60,
    marginBottom: 10
  },
  titleText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#777777'
  },
  contentText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#000000'
  },
  btnAtfilled: {
    flex: 0.3, backgroundColor: '#595959', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 30, color: '#fff', textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
  },
  btnfilled: { backgroundColor: '#CE9528', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 30 },
  btnfilledText: { color: '#fff', fontSize: 12 },
  buttonSpace: { marginTop: 10, alignItems: 'flex-end' }
});
