import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button";
import image_back from '../../assets/image_back.png'
import googleIcon from '../../assets/googleIcon.png'
import { ThemeColor, White, Black, BackgroundColor , textColor1} from "../../utils/Colors";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../components/Header";
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
      <View style={styles.backgroundContainer}>
      <Header navigation={navigation} />

      <View style={styles.blankContainer}>

      </View>
      <View style={styles.imageBackContainer}>
        <Image source={image_back} resizeMode="contain" style={styles.imageBack} />
      </View>
      </View>
      
      <View style={styles.bottomContainer}>
        <Text style={styles.loginText}>Log in</Text>
        <View style={styles.buttonsContainer}>
        <Button onPress={handleLogin} height={60} width={"90%"} backgroundColor={BackgroundColor} >
          <Text style={styles.loginButton}>Email</Text>
        </Button>
        <Button onPress={handleLogin} height={60} width={"90%"} backgroundColor={White} >
            <Image source={googleIcon} style={styles.icon} />
            <Text style={styles.loginButton}>Login with Google</Text>
          </Button>
          
          <TouchableOpacity >
          <Text style={styles.bottomText}>Don't have an account yet? 
           <Text style={styles.signUpLink}>  Sign up</Text>
           </Text>
        </TouchableOpacity>
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
    backgroundColor: BackgroundColor,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackContainer:{
    flex:4
  },
  blankContainer:{
    flex:0.7
  },
  imageBack:{
    height: 400,
    width:'100%'
  },
  logo: {
    width: "50%",
    height: 300,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Black,
  },
  backgroundContainer: {
    flex: 2,
    backgroundColor: 'transparent',
  },
  loginText: {
    marginLeft: 10,
    marginTop: 10,
    color: textColor1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: 'Epilogue', 
  },
  buttonsContainer:{
    alignItems:'center'
  },
  loginButton: {
    color: Black,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    fontFamily: 'Epilogue', 
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  signUpLink: {
    color: textColor1,
    fontWeight:'bold'
,fontSize: 16,


  },
  bottomText:{
    color: White,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Epilogue', 
  }
});