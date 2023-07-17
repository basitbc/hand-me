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
import authActions from "../../redux/auth/actions";

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
    order,
    showMessage,
    auth,
    account,
    getAllOrders,
  } = props;
  const creditLimit = auth?.customer?.user?.creditLimit;
  const outstandingAmount = account?.account?.outstandingAmount;
  useEffect(() => {
    if (calculateGrandTotal() + outstandingAmount >= creditLimit) {
      showMessage("");
    }
  }, [calculateGrandTotal]);

  useEffect(() => {
    if (order?.message?.success === true) {
      navigation.navigate("Order");
    }
  }, [order?.message?.success]);

  const onRenderItem = ({ item }) => {
    return (
      <CartList
        // image={item.image}
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

  const onOrder = async () => {
    let orderData = {
      customerId: props?.auth?.customer?.user?._id,
      products: [],
      totalAmount: calculateGrandTotal(),
      orderedByName: props?.auth?.guestUser?.guestName,
      orderedByPhone: props?.auth?.guestUser?.phone,
    };

    // Iterate over cart items and populate the products array
    cart.cartItems.forEach((item) => {
      orderData.products.push({
        productId: item.id,
        quantity: item.qty,
        cost: item.unitPrice,
      });
    });
    const placedOrder = await placeOrder(orderData);
    getAllOrders(auth?.customer?.user?._id);
    props.authenticate(auth?.login);

    // if (order?.message?.success === true) {
    //   navigation.navigate("Order");
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu
        title="My Cart"
        isFilter={true}
        isSetting={false}
        navigation={navigation}
        isBack={true}
      />
      <View style={styles.subContainer}>
        {cart.cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Cart is Empty</Text>
          </View>
        ) : (
          <FlatList data={cart?.cartItems} renderItem={onRenderItem} />
        )}

        {cart.cartItems.length > 0 && (
          <View style={styles.buttonContainer}>
            <Text style={{ color: "red" }}>{order?.message?.message}</Text>
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
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  account: state.account,
  asyncStorage: state.asyncStorage,
  order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(cartActions.addToCart(item)),
  removeFromCart: (itemId) => dispatch(cartActions.removeFromCart(itemId)),
  updateCartItemQuantity: (itemId, quantity, price) =>
    dispatch(cartActions.updateCartItemQuantity(itemId, quantity, price)),
  clearCart: () => dispatch(cartActions.clearCart()),
  placeOrder: (data) => dispatch(orderActions.createOrder(data)),
  showMessage: (data) => dispatch(orderActions.showMessage(data)),
  getAllOrders: (customerId) => dispatch(orderActions.getAllOrders(customerId)),
  authenticate: (credentials) => {
    dispatch(authActions.authenticate(credentials));
  },
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  addProductsButton: {
    fontSize: 16,
    marginTop: 10,
    color: "blue",
  },
});
