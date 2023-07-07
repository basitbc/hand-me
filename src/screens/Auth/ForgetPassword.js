import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import Input from "../../components/Input";
import { ThemeColor, White } from "../../utils/Colors";
import Button from "../../components/Button";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const { checkEmail, auth, setCredentials } = props;

  const { navigation, sendOtp } = props;

  useEffect(() => {
    if (auth?.isEmailValid === true) {
      navigation.navigate("otp");
      sendOtp(email);
    }
  }, [auth?.isEmailValid]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    // Dispatch the action to send the forgot password email
    if (validateEmail(email)) {
      // Email format is valid
      checkEmail(email);
    } else {
      setIsError(true);

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const handleEmail = (email) => {
    setEmail(email);
    setCredentials({ email: email });
  };

  const renderErrorMessage = () => {
    if (isError) {
      return (
        <Text style={styles.errorText}>
          {auth?.isEmailValid == false
            ? "Email doesn't exist. Please try again."
            : "Please enter a valid email address."}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(text) => handleEmail(text)}
      />

      {renderErrorMessage()}

      <View style={{ marginTop: 15 }}>
        <Button
          onPress={handleForgotPassword}
          backgroundColor={ThemeColor}
          height={50}
        >
          <Text style={styles.loginBtnText}>Send OTP</Text>
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  checkEmail: (email) => {
    dispatch(authActions.checkEmail(email));
  },
  setCredentials: (credentials) => {
    dispatch(authActions.setCredentials(credentials));
  },
  sendOtp: (email) => {
    dispatch(authActions.sendOtp(email));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  loginBtnText: {
    color: White,
    fontSize: 18,
    fontWeight: "500",
  },
});
