import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { ThemeColor, White } from "../../utils/Colors";
import { connect } from "react-redux";
import AuthActions from "../../redux/auth/actions";
import auth from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorageActions from "../../redux/asyncStorage/actions";
import { useFocusEffect } from "@react-navigation/native";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigation } = props;
  const handleForgotPassword = () => {
    navigation.navigate("forgetPassword");
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

  useEffect(() => {
    if (props?.auth?.isLogin && props?.auth?.customer.iat) {
      props.navigation.navigate("userDetails");
    }

    props.getAsyncStorage();
  }, [props?.auth?.isLogin]);

  const handleAuthentication = () => {
    // Implement your logic for handling the forgot password action here
    // For example, navigate to the forgot password screen or show a modal
    const credentials = {
      email: email,
      password: password,
    };
    props.authenticate(credentials);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.subContainer}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
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
                  <Text style={styles.loginText}>Dealer Login</Text>
                </View>
                <View style={{ padding: 10 }}>
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(text) => setEmail(text)}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Input
                    placeholder="Password"
                    value={password}
                    onChange={(text) => setPassword(text)}
                    secureTextEntry={true}
                  />
                  {/* {isWrongPassword && (
                    <Text style={styles.errorText}>
                      {props.auth.errorMessage}
                    </Text>
                  )} */}
                </View>
                {props?.auth?.errorMessage?.message && (
                  <Text style={styles?.errorText}>
                    {props?.auth?.errorMessage?.message}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={handleForgotPassword}
                  style={styles.forgotPasswordContainer}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 15 }}>
                  <Button
                    onPress={handleAuthentication}
                    backgroundColor={ThemeColor}
                    height={50}
                  >
                    <Text style={styles.loginBtnText}>Login</Text>
                  </Button>
                </View>
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
  login: (data) => dispatch(AuthActions.login(data)),
  showError: (errorMessage) => dispatch(AuthActions.showError(errorMessage)),
  clearError: () => dispatch(AuthActions.clearError()),
  resetIsValid: () => dispatch(AuthActions.resetIsValid()),
  getAsyncStorage: () => dispatch(asyncStorageActions.getAsyncStorage()),
  sendOtp: (email) => {
    dispatch(AuthActions.sendOtp(email));
  },
  authenticate: (credentials) => {
    dispatch(AuthActions.authenticate(credentials));
  },
  setCredentials: (credentials) => {
    dispatch(AuthActions.setCredentials(credentials));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

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
  forgotPasswordContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
