import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./src/screens/Landing/Landing"; // Importing Landing screen component
import Auth from "./src/screens/Auth/Auth"; // Importing Auth screen component

export default function Routes() {
  const Stack = createNativeStackNavigator(); // Creating a stack navigator

  return (
    <NavigationContainer> {/* Wrapping the navigation structure with NavigationContainer */}
      <Stack.Navigator initialRouteName="Landing"> {/* Creating stack navigator with initial route Landing */}
        {/* Landing screen */}
        <Stack.Screen
          options={{ headerShown: false }} // Hiding header for Landing screen
          name="Landing" // Name of the screen
          component={Landing} // Component to render
        />
        {/* Auth screen */}
        <Stack.Screen
          options={{ headerShown: false }} // Hiding header for Auth screen
          name="Auth" // Name of the screen
          component={Auth} // Component to render
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
