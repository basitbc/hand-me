import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Logo from "../assets/logo.png";
import { White } from "../utils/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import authActions from "../redux/auth/actions";
import { connect } from "react-redux";

const HeaderMenu = ({
  navigation,
  title,
  isBack,
  isFilter,
  isCart,
  isSetting,
  logout,
  isLogout,
}) => {
  function handleOnBackPress() {
    // navigation.goBack();
  }
  const handleLogout = () => {
    logout();
    navigation.navigate("Auth");
  };

  const handleCart = () => {
    logout();
    navigation.navigate("cart");
  };
  return (
    <View style={styles.headerContainer}>
      <View style={{ flex: 0.3 }}>
        {isBack ? (
          <View style={styles.iconStyle}>
            <Ionicons
              onPress={handleOnBackPress()}
              name={"chevron-back-sharp"}
              size={24}
              color={"#000"}
            />
          </View>
        ) : null}
      </View>

      <View style={{ flex: 0.4, alignItems: "center" }}>
        <Text style={styles.heading}>{title}</Text>
      </View>
      <View
        style={{ flexDirection: "row", flex: 0.3, justifyContent: "flex-end" }}
      >
        {isSetting ? (
          <View style={styles.iconStyle}>
            <Ionicons name={"settings"} size={24} color={"#000"} />
          </View>
        ) : null}
        {isCart ? (
          <View style={styles.iconStyle}>
            <Ionicons
              onPress={handleCart}
              name={"cart-outline"}
              size={24}
              color={"#000"}
            />
          </View>
        ) : null}
        {isLogout ? (
          <View style={styles.iconStyle}>
            <Ionicons
              onPress={handleLogout}
              name={"log-out-outline"}
              size={24}
              color={"#000"}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    marginTop: 10,
    width: "100%",
    height: "10%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: White,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
  },
  iconStyle: { paddingHorizontal: 4 },
  backStyle: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "700",
  },
  midContainer: {
    alignSelf: "center",
    alignItems: "center",
  },
  leftHeader: {
    flexDirection: "row",
  },
  Logo: {
    width: "10%",
    height: 100,
  },
});
