import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button";
import { ThemeColor, White } from "../../utils/Colors";
export default function Landing({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("Auth");
  };

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
}

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
