import React from 'react';
import Card from '../components/Card';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function AddProductCard({
  navigation,
  image,
  title,
  price,
}) {
  return (
    <Card customStyle={{ backgroundColor: '#FFF', borderWidth:1, borderColor:'#E2E2E2' }}>
      <View >
        <Image
          source={require('../assets/product.png')}
          resizeMode="contain"
          style={styles.productImg}
        />
        <Text style={{paddingTop:8}}>{title}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text>{'$'+price}</Text>
        <Ionicons name={'add-circle'} size={30} color={'#CE9528'} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  productImg: {
    width: 120,
    height: 100,
  },
  labelStyle: {
    paddingVertical: '2%',
    flexDirection: 'row',
  },

  titleText: {
    flex: 0.5,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#777777'
  },
  contentText: {
    flex: 0.5,
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
