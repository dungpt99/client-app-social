import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Login from "../screens/Login/Login";
import MainScreen from "../screens/Home/MainScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import Register from "../screens/Register/Register";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector((state) => state.auth.userData);
  console.log("user data", userData);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!!userData ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}

        <Stack.Screen name="Signup" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
