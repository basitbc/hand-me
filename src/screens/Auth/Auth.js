import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  BackHandler,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Logo from "../../assets/logo.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import image_back from "../../assets/image_back.png";
import googleIcon from "../../assets/googleIcon.png";
import { ThemeColor, White, Black, BackgroundColor, textColor1 } from "../../utils/Colors";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Input from "../../components/Input";
import Header from "../../components/Header";

const Auth = (props) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Auth");
  };

  const { navigation } = props;

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
      props.navigation.navigate("Home");
    }
  }, [props?.auth?.isLogin]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleBack = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 64} // Adjust offset based on platform
    >
      <View style={styles.backgroundContainer}>
        {!isKeyboardOpen && <Header navigation={navigation} />}
        {isKeyboardOpen &&
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={30} color="black" style={styles.backIcon} />
      </TouchableOpacity>
      }
        <View style={[styles.imageBackContainer, isKeyboardOpen ? { flex: 1 } : null]}>
          <Image source={image_back} resizeMode="contain" style={[styles.imageBack,isKeyboardOpen ? { height: 320 } : null]} />
        </View>
      </View>

      <View style={[styles.bottomContainer, isKeyboardOpen ? { flex: 3 } : null]}>
        <Text style={styles.loginText}>Log in</Text>
        <View style={styles.buttonsContainer}>
          <Input label={"Email"} width={370} />
          <View style={styles.blankContainer} />
          <Input label={"Password"} width={370} />
          <View style={styles.blankContainer2}></View>
          <Button onPress={handleLogin} height={57} width={"94%"} backgroundColor={BackgroundColor}>
            <Text style={styles.loginButton}>Let's go</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackContainer: {
    flex: 4,
  },
  blankContainer: {
    height: 7,
  },
  blankContainer2: {
    height: 15,
  },
  imageBack: {
    height: 400,
    width: "100%",
  },
  logo: {
    width: "50%",
    height: 300,
  },
  bottomContainer: {
    flex: 1.1,
    backgroundColor: Black,
  },
  backgroundContainer: {
    flex: 1.5,
    backgroundColor: "transparent",
  },
  loginText: {
    marginLeft: 20,
    marginTop: 10,
    color: textColor1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Epilogue",
  },
  buttonsContainer: {
    alignItems: "center",
  },
  loginButton: {
    color: Black,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Epilogue",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  signUpLink: {
    color: textColor1,
    fontWeight: "bold",
  },
  bottomText: {
    color: White,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Epilogue",
  },
  backIcon: {
position:"absolute",
top:40,
left:10,

  },
  backButton: {
    zIndex: 1, 
  },
});
