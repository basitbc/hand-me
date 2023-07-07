import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  BackHandler,
} from "react-native";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button";
import { ThemeColor, White } from "../../utils/Colors";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
const Landing = (props) => {
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
        <View>
          <Text style={styles.welcomeText}>
            Welcome to biggest {"\n"} wallpapers Trader in India
          </Text>
          <Button
            onPress={handleLogin}
            height={60}
            backgroundColor={ThemeColor}
          >
            <Text style={styles.loginText}>Login</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

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
    width: "50%",
    height: 300,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 50,
  },
  loginText: {
    color: White,
    fontSize: 18,
    fontWeight: "500",
  },
});
