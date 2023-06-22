import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import HeaderMenu from "../../components/HeaderMenu";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import { ThemeColor } from "../../utils/Colors";
import { connect } from "react-redux";
import cartActions from "../../redux/cart/actions";

const widthScreen = Dimensions.get("window").width;

const ProductDetail = ({ route, navigation, addToCart }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    item: {},
    qty: 1,
  });
  const [qty, setQty] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const [items, setItems] = useState([
    { label: "Styles", value: "Styles" },
    { label: "Styles", value: "Styles" },
  ]);

  const item = route.params.item;

  useEffect(() => {
    console.log(item, "iitm");
    if (route.params) {
      setValue({
        ...value,
        item: item,
      });
      setTotalPrice(item.price);
    } else {
    }
  }, [route.params]);

  const onCart = () => {
    let CartItem = {
      id: value?.item?.productId?._id,
      product: value?.item?.productId?.name,
      price: totalPrice,
      qty: value.qty,
      unitPrice: value?.item?.price,
    };
    addToCart(CartItem);
    navigation.navigate("cart");
  };
  const updateQuantity = (newQty) => {
    let updatedValue = { ...value, qty: newQty };
    setValue(updatedValue);
    setTotalPrice(updatedValue.qty * updatedValue.item.price);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu
        isBack={true}
        title={""}
        isFilter={false}
        isCart={true}
        isSetting={true}
      />
      <ScrollView>
        <View>
          <Image
            source={require("../../assets/product.png")}
            // resizeMode="contain"
            style={styles.productImg}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.favsection}>
            <Text style={styles.subheading}>
              {route.params.item?.productId?.name}
            </Text>
            <Ionicons name={"heart-outline"} size={24} color={"#000"} />
          </View>
          <View>
            <Text>{"by  K2Implex"}</Text>
          </View>
          <View style={[styles.favsection, { marginVertical: 15 }]}>
            <View style={styles.countSection}>
              <Ionicons
                name={"remove-sharp"}
                size={24}
                onPress={() => {
                  const newQty = value.qty !== 1 ? value.qty - 1 : 1;
                  updateQuantity(newQty);
                }}
                color={"#000"}
                style={{ paddingRight: 8 }}
              />
              <View style={styles.boxText}>
                <Text>{value.qty}</Text>
              </View>
              <Ionicons
                onPress={() => {
                  const newQty = value.qty + 1;
                  updateQuantity(newQty);
                }}
                name={"add"}
                size={24}
                color={"#000"}
                style={styles.iconStyle}
              />
            </View>
            <View>
              <Text>{`₹${value?.item?.price}/Roll`}</Text>
            </View>
          </View>
          {/* <View>
            <View style={{paddingVertical: 10}}>
              <Text>{'Size'}</Text>
            </View>
            <View style={styles.favsection}>
              <View style={styles.countSection}>
                <View style={styles.sizeContainer}>
                  <Text>{'S'}</Text>
                </View>
                <View style={styles.sizeContainer}>
                  <Text>{'M'}</Text>
                </View>
                <View style={styles.sizeContainer}>
                  <Text>{'L'}</Text>
                </View>
              </View>
              <View>
                <Ionicons
                  name={'chevron-down-sharp'}
                  size={24}
                  color={'#000'}
                  style={styles.iconStyle}
                />
              </View>
            </View>
            <View style={styles.horizontalLine} />
          </View> */}

          <View>
            <Text style={styles.heading}>Product Detail</Text>
            <Text>{item?.productId?.details}</Text>
          </View>
          <View style={{ alignItems: "center", paddingVertical: 25 }}>
            <Button
              onPress={() => onCart()}
              backgroundColor={ThemeColor}
              height={60}
              width={widthScreen - 50}
            >
              <Text
                style={styles.buttonText}
              >{`Add to Cart - ₹${totalPrice}`}</Text>
            </Button>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text>Free standard shipping</Text>
            <Text style={styles.underlineText}>Free returns</Text>
          </View>
        </View>
        <View />
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
  asyncStorage: state.asyncStorage,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(cartActions.addToCart(item)),
  removeFromCart: (itemId) => dispatch(cartActions.removeFromCart(itemId)),
  updateCartItemQuantity: (itemId, quantity, price) =>
    dispatch(cartActions.updateCartItemQuantity(itemId, quantity, price)),
  clearCart: () => dispatch(cartActions.clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productImg: {
    borderRadius: 20,
    width: widthScreen,
    height: 250,
  },
  subheading: { fontSize: 16, fontWeight: "500", color: "#000" },
  favsection: { flexDirection: "row", justifyContent: "space-between" },
  sizeContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 5,
  },
  countSection: { flexDirection: "row", alignItems: "center" },
  boxText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  horizontalLine: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  heading: { fontSize: 14, fontWeight: "bold", paddingBottom: 10 },
  iconStyle: { paddingHorizontal: 8 },
  underlineText: { paddingHorizontal: 20, textDecorationLine: "underline" },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
