import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
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

const Auth = (props) => {
  const [otp, setOtp] = useState("");
  const [isWrongPassword, setisWrongPassword] = useState(false);

  // const handleLogin = () => {
  //   navigation.navigate("Home");
  // };

  useEffect(() => {
    if (props?.auth?.isLogin && props?.auth?.customer.iat) {
      props.navigation.navigate("Home");
    }
    props.getAsyncStorage();
  }, [props?.auth?.isLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (otp !== "") {
      try {
        const credentials = {
          email: props?.auth?.credentials?.email,
          otpValue: otp,
        };
        if (credentials.otpValue) {
          console.log(credentials, "credentials");
          props.authenticate(credentials);
        }
        console.log(props?.auth, "succcess");
        if (props?.auth?.loginSuccess == true) {
          props.navigation.navigate("Home");
        } else {
          setisWrongPassword(true);
          props.showError("Incorrect Otp");
          setTimeout(() => {
            props.clearError();
            setisWrongPassword(false);
          }, 3000);
        }
      } catch (error) {
        if (error) {
          setisWrongPassword(true);
          props.showError("Wrong credentials");
          setTimeout(() => {
            props.clearError();
            setisWrongPassword(false);
          }, 3000);
          console.error("Bad Request: Password is incorrect");
        } else {
          console.error("Authentication failed:", error);
          setisWrongPassword(true);
          props.showError("Wrong credentials");
          setTimeout(() => {
            props.clearError();
            setisWrongPassword(false);
          }, 3000);
        }
      }
    }
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

                {props.auth.otpStatus.IsPresent && (
                  <Text
                    style={
                      props.auth.otpStatus.IsPresent == true
                        ? styles.successText
                        : styles.errorText
                    }
                  >
                    {props.auth.otpStatus.message} to your registered email
                  </Text>
                )}

                <View style={{ padding: 10 }}>
                  <Input
                    placeholder="Otp"
                    value={otp}
                    onChange={(text) => setOtp(text)}
                    secureTextEntry={true}
                  />
                  {isWrongPassword && (
                    <Text style={styles.errorText}>
                      {props.auth.errorMessage}
                    </Text>
                  )}
                </View>

                <View style={{ marginTop: 15 }}>
                  <Button
                    onPress={handleLogin}
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
});
