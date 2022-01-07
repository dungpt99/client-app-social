import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import Share from "../../components/Share";
import HomeScreen from "./HomeScreen";
import { API_BASE_URL } from "../../config/urls";
import store from "../../redux/store";
import types from "../../redux/types";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function ProfileScreen({ navigation }) {
  const userData = useSelector((state) => state.auth.userData);
  const { dispatch } = store;
  const handleLogout = async () => {
    dispatch({ type: types.CLEAR_REDUX_STATE });
  };
  return (
    <View style="styles.container">
      <ScrollView>
        <View style={styles.information}>
          <Image
            source={require("../../../public/images/noavatar.png")}
            style={styles.imgCover}
          ></Image>
          <View style={styles.user}>
            <Image
              source={{
                uri:
                  userData.avatar ||
                  API_BASE_URL + "/assets/person/noavatar.png",
              }}
              style={styles.avatar}
            ></Image>
            <Text style={styles.name}>{userData.name}</Text>
          </View>
        </View>
        <HomeScreen userId={userData.id} />
      </ScrollView>
      <View style={styles.logout}>
        <Button title="Logout" color={"#ccc"} onPress={handleLogout}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
  },
  information: {
    position: "relative",
    height: 300,
  },
  imgCover: {
    maxHeight: 250,
    width: "100%",
    resizeMode: "cover",
  },
  user: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
    bottom: 25,
    textAlign: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 18,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logout: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
