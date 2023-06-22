import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Input from '../../components/Input';
import AddProductCard from '../../components/AddProductCard'
import { ProductList } from '../../constants/Constants';
import HeaderMenu from '../../components/HeaderMenu';


export default function Products() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Styles', value: 'Styles' },
        { label: 'Styles', value: 'Styles' },
    ]);


    const onRenderItem = ({ item }) => {
        return (
            <AddProductCard
                // image={item.imageName}
                price={item.price}
                title={item.title}
            />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <HeaderMenu
                isBack={true}
                title={'Products'}
                isFilter={true}
                isCart={true}
                isSetting={true}
            />
            <View style={{marginBottom:30}}>
                <View style={styles.inputContainer}>
                    <Input placeholder="Search Products" />
                </View>
                <View style={{paddingHorizontal:20}}>
                <FlatList
                    data={ProductList}
                    renderItem={onRenderItem}
                    numColumns={2}
                />
                </View>
                <View />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:15
    },
});
