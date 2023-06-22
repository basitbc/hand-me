import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import HeaderMenu from "../../components/HeaderMenu";
import CartList from "../../components/CartList";
import FavList from "../../components/FavList";
import cartActions from "../../redux/cart/actions";
import { connect } from "react-redux";
import { ThemeColor } from "../../utils/Colors";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorageActions from "../../redux/asyncStorage/actions";
import orderActions from "../../redux/orders/actions";

const widthScreen = Dimensions.get("window").width;

const MyCart = (props) => {
  const {
    removeFromCart,
    route,
    navigation,
    updateCartItemQuantity,
    addToCart,
    cart,
    asyncStorage,
    placeOrder,
  } = props;

  // useEffect(() => {
  //   try {
  //     // const cartItems = JSON.parse(asyncStorage?.asyncStorage.cart);
  //     // cartItems.map((item) => {
  //     //   addToCart(item);
  //     // });
  //   } catch (error) {
  //     console.error("Error parsing asyncStorage data:", error);
  //   }
  // }, []);

  const onRenderItem = ({ item }) => {
    return (
      <CartList
        // image={item.image}
        navigation={navigation}
        item={item}
        qty={item.qty}
        productname={item.product}
        productprice={item.price}
        onRemove={() => removeFromCart(item.id)}
        onUpdateQuantity={(quantity, price) =>
          updateCartItemQuantity(item.id, quantity, price)
        }
      />
    );
  };
  const calculateGrandTotal = () => {
    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item?.price;
    });
    return total.toFixed(2);
  };

  const onOrder = () => {
    let orderData = {
      customerId: props?.auth?.customer?.user?._id,
      products: [],
      totalAmount: calculateGrandTotal(),
    };

    // Iterate over cart items and populate the products array
    cart.cartItems.forEach((item) => {
      orderData.products.push({
        productId: item.id,
        quantity: item.qty,
      });
    });

    placeOrder(orderData);

    navigation.navigate("Order");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu title="My Cart" isFilter={true} isSetting={false} />
      <View style={styles.subContainer}>
        <FlatList data={cart?.cartItems} renderItem={onRenderItem} />

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => onOrder()}
            backgroundColor={ThemeColor}
            height={60}
            width={widthScreen - 50}
          >
            <Text style={styles.buttonText}>
              Order Now - {calculateGrandTotal()}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  asyncStorage: state.asyncStorage,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(cartActions.addToCart(item)),
  removeFromCart: (itemId) => dispatch(cartActions.removeFromCart(itemId)),
  updateCartItemQuantity: (itemId, quantity, price) =>
    dispatch(cartActions.updateCartItemQuantity(itemId, quantity, price)),
  clearCart: () => dispatch(cartActions.clearCart()),
  placeOrder: (data) => dispatch(orderActions.createOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
