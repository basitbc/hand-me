import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { FavouriteList } from "../../constants/Constants";
import HeaderMenu from "../../components/HeaderMenu";
import FavList from "../../components/FavList";
import { connect } from "react-redux";
import accountActions from "../../redux/accounts/actions";

const Account = (props) => {
  const { auth, navigation, account, getCustomerAccount } = props;

  useEffect(() => {
    getCustomerAccount(auth?.customer?.user?._id);
  }, []);

  const creditLimit = auth?.customer?.user?.creditLimit;
  const outstandingAmount = account?.account?.outstandingAmount;

  const menuList = [
    {
      name: "Personal Settings",
      icon: "ios-settings",
    },
  ];

  const onRenderItem = ({ item }) => {
    return (
      <FavList menuName={item.name} icon={item.icon} navigation={navigation} />
    );
  };

  const renderCreditMessage = () => {
    if (outstandingAmount >= creditLimit) {
      return (
        <Text style={{ color: "red", fontSize: 16, marginTop: 10 }}>
          You have reached the credit limit. Please contact the office for
          placing more orders.
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu
        title="Account"
        isFilter={true}
        isLogout={true}
        isCart={true}
        isSetting={false}
        navigation={navigation}
      />
      <View style={styles.subContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={{ color: "black", fontSize: 17, fontWeight: "900" }}>
              Credit Limit
            </Text>
            <Text style={{ color: "green", fontSize: 22 }}>
              ₹ {auth?.customer?.user?.creditLimit?.toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={{ color: "black", fontSize: 17, fontWeight: "900" }}>
              Outstanding Amount
            </Text>
            <Text style={{ color: "red", fontSize: 22 }}>
              ₹{" "}
              {account?.account?.outstandingAmount
                ? account?.account?.outstandingAmount?.toLocaleString("en-IN")
                : 0}
            </Text>
          </View>
        </View>
        {renderCreditMessage()}
        <FlatList data={menuList} renderItem={onRenderItem} />
        <View />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
  customer: state.customer,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerAccount: (customerId) =>
    dispatch(accountActions.getCustomerAccount(customerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  subContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  columnContainer: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  selector: {
    marginTop: 10,
    width: "78%",
    alignSelf: "center",
  },
  headingText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#000000",
  },
  headingBorder: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
});
