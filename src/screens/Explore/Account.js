import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { FavouriteList } from "../../constants/Constants";
import HeaderMenu from "../../components/HeaderMenu";
import FavList from "../../components/FavList";
import { connect } from "react-redux";
import accountActions from "../../redux/accounts/actions";
import authActions from "../../redux/auth/actions";

const Account = (props) => {
  const { auth, navigation, account, getCustomerAccount } = props;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCustomerAccount(auth?.customer?.user?._id);
    props.authenticate(auth?.login);
  }, []);

  const creditLimit = auth?.customer?.user?.creditLimit;
  const outstandingAmount = account?.account?.outstandingAmount;
  const handleRefresh = () => {
    // Implement your refresh logic here
    setRefreshing(true);
    props.authenticate(auth?.login);
    getAllPrices(auth?.customer?.user?._id);
    // After refreshing is complete, setRefreshing to false
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const menuList = [
    // {
    //   name: "Personal Settings",
    //   icon: "ios-settings",
    // },
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
              {auth?.customer?.user?.outstandingAmount
                ? auth?.customer?.user?.outstandingAmount?.toLocaleString(
                    "en-IN"
                  )
                : 0}
            </Text>
          </View>
        </View>
        {renderCreditMessage()}
        <Text style={{ color: "black", fontSize: 15, fontWeight: "500" }}>
          Logged In Guest: {auth?.guestUser?.guestName}
        </Text>
        <FlatList
          data={menuList}
          renderItem={onRenderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
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
  authenticate: (credentials) => {
    dispatch(authActions.authenticate(credentials));
  },
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
