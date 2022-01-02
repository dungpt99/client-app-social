import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Login from "../screens/Login/Login";
import MainScreen from "../screens/Home/MainScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import Register from "../screens/Register/Register";
import * as SecureStore from "expo-secure-store";
import Share from "../screens/Share/Share";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector((state) => state.auth.userData);
  useState(async () => {
    console.log(await SecureStore.getItemAsync("accessToken"));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.keys(userData).length !== 0 ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="Signup" component={Register} />
        <Stack.Screen name="Share" component={Share} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
