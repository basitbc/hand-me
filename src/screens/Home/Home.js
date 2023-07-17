import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  BackHandler,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";

import ProductCard from "../../components/ProductCard";
import { serviceCategory } from "../../constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import priceListActions from "../../redux/priceList/actions";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import asyncStorageActions from "../../redux/asyncStorage/actions";

import { useFocusEffect } from "@react-navigation/native";
import ButtonGroup from "../../components/ButtonGroup";
import accountActions from "../../redux/accounts/actions";
import orderActions from "../../redux/orders/actions";

const Home = (props) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().getMonth().toString();
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
    getAllOrders,
    getCustomerAccount,
  } = props;

  useEffect(() => {
    getAllPrices(auth?.customer?.user?._id);

    getAsyncStorage();
  }, []);

  const handleRefresh = () => {
    // Implement your refresh logic here
    setRefreshing(true);
    getAllPrices(auth?.customer?.user?._id);
    getAllOrders(auth?.customer?.user?._id);
    getCustomerAccount(auth?.customer?.user?._id, currentYear, currentMonth);
    // After refreshing is complete, setRefreshing to false
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
        productCode={item?.productId?.catalogueCode}
        navigation={navigation}
        productPhoto={item?.productId?.productPhoto}
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

  // const filterProducts = (products, selectedButton, searchValue) => {
  //   // Apply search filter
  //   let filteredProducts =
  //     products &&
  //     products.filter((product) => {
  //       if (searchValue) {
  //         const productCode = product?.productId?.code || "";
  //         return productCode.includes(searchValue);
  //       }
  //       return true;
  //     });

  //   // Apply availableAt filter
  //   if (selectedButton) {
  //     const Availability =
  //       selectedButton === 1 ? null : selectedButton === 2 ? "mumbai" : "delhi";
  //     filteredProducts =
  //       filteredProducts &&
  //       filteredProducts.filter((product) => {
  //         const availableAt = product?.productId?.availableAt || "";
  //         if (Availability === null) {
  //           return true; // Show all products when buttonSelected is 1
  //         } else {
  //           return availableAt.toLowerCase() === Availability;
  //         }
  //       });
  //   }

  //   return filteredProducts;
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.subContainer}>
        <View style={styles.inputContainer}>
          <Input
            onChange={onSearch}
            value={searchValue}
            placeholder="Search For Catalogue Code"
          />
          {/* <Input placeholder="Select the Category" />
          <Input placeholder="Select the Style" /> */}
        </View>
        {/* <View>
          <ButtonGroup />
        </View> */}
        <FlatList
          // data={filterProducts(
          //   priceList?.prices?.data?.products,
          //   props?.priceList.selectedButton,
          //   searchValue
          // )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          data={priceList?.prices?.data?.products}
          renderItem={onRenderItem}
          ListEmptyComponent={() => (
            <Text style={styles.noProductsText}>No products found</Text>
          )}
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
  subContainer: {
    flex: 1,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  selector: {
    marginTop: 10,
    width: "78%",
    alignSelf: "center",
  },
  noProductsText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",

    marginTop: 20,
    fontStyle: "italic",
    // Add any other styling properties you desire
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
  getAllOrders: (customerId) => dispatch(orderActions.getAllOrders(customerId)),
  getCustomerAccount: (customerId, currentYear, currentMonth) =>
    dispatch(
      accountActions.getCustomerAccount(customerId, currentYear, currentMonth)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
