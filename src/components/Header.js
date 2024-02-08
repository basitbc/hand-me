import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Logo from "../assets/logo.png";

const Header = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="chevron-back" size={30} color="black" style={styles.backIcon} />
      </TouchableOpacity>

      {/* Logo (Centered) */}
      <View style={styles.logoContainer}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  logoContainer: {
    flex: 1, // This will make the logo take up remaining space and center itself
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: 50,
  },
});

export default Header;
