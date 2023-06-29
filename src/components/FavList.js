import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FavList({ navigation, image, menuName, icon }) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        // Handle navigation to the respective menu item
        navigation.navigate("personalDetails");
      }}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={30} color={"#000"} />
      </View>
      <View style={styles.menuNameContainer}>
        <Text style={styles.titleText}>{menuName}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name={"chevron-forward-sharp"} size={30} color={"#000"} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#000000",
  },
  btnAtfilled: {
    flex: 0.3,
    backgroundColor: "#595959",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 30,
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  btnfilled: {
    backgroundColor: "#CE9528",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  btnfilledText: { color: "#fff", fontSize: 12 },
  buttonSpace: { marginTop: 10, alignItems: "flex-end" },
  cardContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
    marginVertical: 1,
    paddingVertical: 10,
  },
  iconContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  menuNameContainer: {
    flex: 0.8,
    justifyContent: "center",
  },
  arrowContainer: {
    flex: 0.1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "900",
    fontSize: 15,
    lineHeight: 15,
    color: "#000",
  },
});
