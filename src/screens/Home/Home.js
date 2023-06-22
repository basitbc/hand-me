import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  BackHandler,
} from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import DropDownPicker from "react-native-dropdown-picker";

import ProductCard from "../../components/ProductCard";
import { serviceCategory } from "../../constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import priceListActions from "../../redux/priceList/actions";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import asyncStorageActions from "../../redux/asyncStorage/actions";

import { useFocusEffect } from "@react-navigation/native";
import ButtonGroup from "../../components/ButtonGroup";

const Home = (props) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([
    { label: "Styles", value: "Styles" },
    { label: "Styles", value: "Styles" },
  ]);

  const {
    getAllPrices,
    navigation,
    auth,
    getAsyncStorage,
    clearAsyncStorage,
    priceList,
  } = props;

  useEffect(() => {
    setProducts(serviceCategory);
    console.log(auth, "auth in home");
    getAllPrices(auth?.customer?.user?._id);
    getAsyncStorage();
    console.log(navigation);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Prevent going back to home screen
        return true;
      };

      // Add event listener for the back button press
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Clean up the event listener on component unmount
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const onRenderItem = ({ item }) => {
    return (
      <ProductCard
        item={item}
        image={item.imageName}
        productName={item?.productId?.name}
        availableAt={item?.productId?.availableAt}
        productCode={item?.productId?.code}
        navigation={navigation}
      />
    );
  };

  const onSearch = (item) => {
    setSearchValue(item);
  };

  // // Function to filter products based on availability and button selection
  // const filterProducts = (products, buttonSelected) => {
  //   // Convert products.isAvailable to lowercase for comparison
  //   const Availability =
  //     buttonSelected === 1 ? null : buttonSelected === 2 ? "mumbai" : "delhi";
  //   // Filter products based on availability
  //   return products?.filter((product) => {
  //     if (Availability === null) {
  //       return true; // Show all products when buttonSelected is 1
  //     } else {
  //       const productAvailability =
  //         product?.productId?.availableAt?.toLowerCase();
  //       return productAvailability === Availability;
  //     }
  //   });
  // };

  const filterProducts = (products, selectedButton, searchValue) => {
    // Apply search filter
    let filteredProducts =
      products &&
      products.filter((product) => {
        if (searchValue) {
          const productCode = product?.productId?.code || "";
          return productCode.includes(searchValue);
        }
        return true;
      });

    // Apply availableAt filter
    if (selectedButton) {
      const Availability =
        selectedButton === 1 ? null : selectedButton === 2 ? "mumbai" : "delhi";
      filteredProducts =
        filteredProducts &&
        filteredProducts.filter((product) => {
          const availableAt = product?.productId?.availableAt || "";
          if (Availability === null) {
            return true; // Show all products when buttonSelected is 1
          } else {
            return availableAt.toLowerCase() === Availability;
          }
        });
    }

    return filteredProducts;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.subContainer}>
        <View style={styles.inputContainer}>
          <Input
            onChange={onSearch}
            value={searchValue}
            placeholder="Search For Product Code"
          />
          {/* <Input placeholder="Select the Category" />
          <Input placeholder="Select the Style" /> */}
        </View>
        <View>
          <ButtonGroup />
        </View>
        <FlatList
          data={filterProducts(
            priceList?.prices?.data?.products,
            props?.priceList.selectedButton,
            searchValue
          )}
          renderItem={onRenderItem}
        />
        {/* <View style={styles.inputContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.selector}
            placeholder="Select Category"
          />
        </View>
        <View style={styles.inputContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.selector}
            placeholder="Select Style"
          />
        </View> */}
        <View />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: {},
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  selector: {
    marginTop: 10,
    width: "78%",
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  priceList: state.priceList,
});

const mapDispatchToProps = (dispatch) => ({
  forgetPassword: (email) => dispatch(authActions.sendCode(email)),
  getAllPrices: (customerId) =>
    dispatch(priceListActions.getAllPrices(customerId)),
  getAsyncStorage: () => dispatch(asyncStorageActions.getAsyncStorage()),
  clearAsyncStorage: () => dispatch(asyncStorageActions.clearAsyncStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
