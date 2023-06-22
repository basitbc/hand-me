import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./src/screens/Landing/Landing";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Auth from "./src/screens/Auth/Auth";
import Home from "./src/screens/Home/Home";
import Transaction from "./src/screens/Transaction/Transaction";
import Order from "./src/screens/Order/Order";
import Products from "./src/screens/Explore/Products";
import Favourite from "./src/screens/Explore/Favourite";
import ProductDetail from "./src/screens/Explore/ProductDetail";
import MyCart from "./src/screens/Order/MyCart";
import otp from "./src/screens/Auth/otp";
// import ForgotPassword from "./src/screens/Auth/otp";

export default function Routes() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  // const StackAuth = createNativeStackNavigator();

  function StackHomeScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
          },
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === "Products") {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === "Order") {
              iconName = focused ? "basket" : "basket-outline";
            } else if (rn === "Landing") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (rn === "Transaction") {
              iconName = focused ? "wallet" : "wallet-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" options={{ title: "Shop" }} component={Home} />
        {/* <Tab.Screen
        name="Products"
        component={Products}
        options={{title: 'Explore'}}
      /> */}
        <Tab.Screen name="Transaction" component={Transaction} />
        <Tab.Screen name="Order" component={Order} />
        <Tab.Screen
          name="Landing"
          component={Favourite}
          options={{ title: "Account" }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Landing"
          component={Landing}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Auth"
          component={Auth}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="otp"
          component={otp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={StackHomeScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="productDetails"
          component={ProductDetail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="cart"
          component={MyCart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
