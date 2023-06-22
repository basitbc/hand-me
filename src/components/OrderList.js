import React from "react";
import Card from "../components/OrderCard";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import OrdersInfoModal from "./OrdersInfoModal";
export default function OrderList({ orderNo, totalAmount, status, item }) {
  return (
    <Card customStyle={{ backgroundColor: "#FFF" }}>
      <View style={styles.cardContainer}>
        <View style={{ flex: 0.3 }}>
          <Text style={[styles.titleText]}>{orderNo}</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.titleText}>{totalAmount} INR</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={[styles.contentText, { marginLeft: 5 }]}>{status}</Text>
        </View>
        <View style={{ flex: 0.1 }}>
          {/* <Ionicons name="information-circle-outline" size={20} color="blue" />
           */}
          <OrdersInfoModal item={item} />
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
