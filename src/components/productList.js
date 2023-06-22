import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./ProductDetailsCard";
import OrdersInfoModal from "./OrdersInfoModal";

export default function ProductList({ item }) {
  return (
    <Card customStyle={{ backgroundColor: "#FFF" }}>
      <View style={styles.cardContainer}>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.titleText}>{item.productId.name}</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.contentText}> {item.quantity}</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.contentText}>${item.productId.defaultprice}</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.contentText}>${item.productId.defaultprice}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
  },
  titleText: {
    flex: 0.5,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#25213B",
  },
  contentText: {
    flex: 0.5,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#000000",
  },
});
