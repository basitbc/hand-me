import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Orders } from "../constants/Constants";

export default function CartList({
  item,
  image,
  productname,
  productprice,
  qty,
  onRemove,
  onUpdateQuantity,
}) {
  useEffect(() => {
    console.log(item, "item here");
  }, []);

  const handleUpdateQnty = (fun) => {
    if (false) {
    } else {
      if (fun == "increase") {
        onUpdateQuantity(1, item.unitPrice);
      } else {
        onUpdateQuantity(-1, -item.unitPrice);
      }
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={{ flex: 0.3 }}>
        <Image
          source={require("../assets/product.png")}
          resizeMode="contain"
          style={styles.productImg}
        />
      </View>
      <View
        style={{
          flex: 0.7,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText} numberOfLines={2}>
            {productname}
          </Text>
          <View style={styles.countSection}>
            <View style={styles.boxText}>
              <Ionicons
                onPress={() => {
                  handleUpdateQnty("decrease");
                }}
                name={"remove-sharp"}
                size={22}
                color={"#000"}
              />
            </View>
            <View style={{ paddingHorizontal: 8 }}>
              <Text>{qty}</Text>
            </View>
            <View style={styles.boxText}>
              <Ionicons
                onPress={() => {
                  handleUpdateQnty("increase");
                }}
                name={"add"}
                size={22}
                color={"#000"}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.contentText}>{productprice}</Text>
          <Ionicons
            onPress={onRemove}
            name={"close"}
            size={22}
            color={"#E2E2E2"}
            style={{ marginLeft: 8 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
    marginVertical: 4,
  },
  productImg: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  titleText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#777777",
  },
  contentText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 15,
    color: "#000000",
    paddingVertical: 15,
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
  countSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
  },
  boxText: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  iconStyle: { paddingHorizontal: 8 },
  productSection: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
});
