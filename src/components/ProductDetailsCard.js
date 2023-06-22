import React from "react";
import { View, StyleSheet } from "react-native";
import { Shadow, White } from "../utils/Colors";
export default function ProductDetailsCard({ children, customStyle }) {
  return <View style={[styles.Card, customStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  Card: {
    // height: 90,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: White,
    borderRadius: 12,
    shadowColor: Shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
});
