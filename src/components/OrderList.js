import React from "react";
import Card from "../components/OrderCard";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import OrdersInfoModal from "./OrdersInfoModal";
export default function OrderList({
  orderNo,
  totalAmount,
  status,
  item,
  usedIn,
}) {
  let statusColor = "#000000";

  if (status === "pending") {
    statusColor = "orange";
  } else if (status === "delivered") {
    statusColor = "blue";
  } else if (status === "cancelled") {
    statusColor = "red";
  } else if (status === "completed") {
    statusColor = "green";
  }

  const paymentStatus = status == "completed" ? "paid" : status;
  return (
    <Card customStyle={{ backgroundColor: "#FFF" }}>
      <View style={styles.cardContainer}>
        <View style={{ flex: 0.3 }}>
          <Text style={[styles.titleText]}>{orderNo}</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.titleText}>
            ₹ {totalAmount && totalAmount.toLocaleString("en-IN")}
          </Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={[styles.contentText, { color: statusColor }]}>
            {paymentStatus && paymentStatus}
          </Text>
        </View>
        {usedIn == "Order" && (
          <View style={{ flex: 0.1 }}>
            {/* <Ionicons name="information-circle-outline" size={20} color="blue" />
             */}
            <OrdersInfoModal item={item} />
          </View>
        )}
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
