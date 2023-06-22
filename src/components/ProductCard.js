import React from "react";
import Card from "../components/Card";
import { Image, StyleSheet, Text, View } from "react-native";
export default function ProductCard({
  navigation,
  item,
  image,
  productName,
  availableAt,
  onCart,
  productCode,
}) {
  return (
    <Card customStyle={{ backgroundColor: "#F3F3F3" }}>
      <View style={styles.cardContainer}>
        <View style={{ flex: 0.4 }}>
          <Image
            source={require("../assets/product.png")}
            resizeMode="contain"
            style={styles.productImg}
          />
        </View>
        <View style={{ flex: 0.6 }}>
          <View style={styles.labelStyle}>
            <Text style={styles.titleText}>Product Name:</Text>
            <Text
              style={styles.contentText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {productName}
            </Text>
          </View>
          <View style={styles.labelStyle}>
            <Text style={styles.titleText}>Available At:</Text>
            <Text style={styles.btnAtfilled}>{availableAt}</Text>
          </View>
          <View style={styles.labelStyle}>
            <Text style={styles.titleText}>Product Code:</Text>
            <Text style={styles.contentText}>{productCode}</Text>
          </View>
          <View style={styles.buttonSpace}>
            <View style={styles.btnfilled}>
              <Text
                onPress={() =>
                  navigation.navigate("productDetails", {
                    item: item,
                  })
                }
                style={styles.btnfilledText}
              >
                Enquire now
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
  },
  productImg: {
    width: 120,
    height: 100,
  },
  labelStyle: {
    paddingVertical: "2%",
    flexDirection: "row",
  },

  titleText: {
    flex: 0.5,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#777777",
  },
  contentText: {
    flex: 0.5,
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
});
