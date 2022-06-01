import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Login from "../screens/Login/Login";
import MainScreen from "../screens/Home/MainScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import Register from "../screens/Register/Register";
import Share from "../screens/Share/Share";
import ProfileDetail from "../screens/ProfileDetail/ProfileDetail";
import Conversation from "../screens/ConversationDetail/Conversation";
import Search from "../screens/Search/Search";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.keys(userData).length !== 0 ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
        <Stack.Screen name="Share" component={Share} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
