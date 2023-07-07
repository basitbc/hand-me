import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { ThemeColor, White } from "../../utils/Colors";
import { connect } from "react-redux";

import customerActions from "../../redux/customers/actions";
import { useFocusEffect } from "@react-navigation/native";
import authActions from "../../redux/auth/actions";

const UserDetails = (props) => {
  const { navigation } = props;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

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

  const submitDetails = () => {
    if (!user.trim()) {
      setError("Name is required.");
    } else if (!validatePhoneNumber(phoneNumber)) {
      setError("Invalid phone number.");
    } else {
      const data = {
        phone: phoneNumber,
        guestName: user,
      };
      props.updateGuestUser(props?.auth?.customer?.user?._id, data);
      navigation.navigate("Home");
    }
  };

  const validatePhoneNumber = (number) => {
    // Implement your phone number validation logic here
    // For example, you can use a regular expression to validate the format
    const phoneNumberRegex = /^[0-9]{10}$/; // Assumes 10-digit phone number
    return phoneNumberRegex.test(number);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.subContainer}>
        <View>
          <View>
            <Card customStyle={{ padding: 15 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                }}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.loginText}>Enter User Details</Text>
                </View>
                <View style={{ padding: 10 }}>
                  <Input
                    placeholder="Name"
                    value={user}
                    onChange={(text) => setUser(text)}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Input
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(text) => setPhoneNumber(text)}
                  />
                </View>

                <View style={{ marginTop: 15 }}>
                  <Button
                    onPress={submitDetails}
                    backgroundColor={ThemeColor}
                    height={50}
                  >
                    <Text style={styles.loginBtnText}>Submit</Text>
                  </Button>
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>
            </Card>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  updateGuestUser: (customerId, data) => {
    dispatch(authActions.updateGuestUser(customerId, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "30%",
    height: 200,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 50,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "500",
  },
  cardHeader: {
    margin: 10,
  },
  loginBtnText: {
    color: White,
    fontSize: 18,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: 16,
  },
});
