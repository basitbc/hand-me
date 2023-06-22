import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { FavouriteList } from "../../constants/Constants";
import HeaderMenu from "../../components/HeaderMenu";
import FavList from "../../components/FavList";

export default function Favourite({ navigation }) {
  const onRenderItem = ({ item }) => {
    return (
      <FavList
        // image={item.image}
        productname={item.product}
        productprice={item.price}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu
        title="Favourite"
        isFilter={true}
        isLogout={true}
        isCart={true}
        isSetting={false}
        navigation={navigation}
      />
      <View style={styles.subContainer}>
        <FlatList data={FavouriteList} renderItem={onRenderItem} />
        <View />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  subContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  selector: {
    marginTop: 10,
    width: "78%",
    alignSelf: "center",
  },
  headingText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#000000",
  },
  headingBorder: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
});
