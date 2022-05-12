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
import HomeScreen from "./HomeScreen";
import { API_BASE_URL } from "../../config/urls";
import store from "../../redux/store";
import types from "../../redux/types";
import { signOut } from "../../api/auth";

export default function ProfileScreen({ navigation }) {
  const userData = useSelector((state) => state.auth.userData);
  const { dispatch } = store;
  const logout = async () => {
    try {
      await signOut(dispatch)
    } catch (error) {
      console.log(`logout error ${error}`);
    }
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
        <Button title="Logout" color={"red"} onPress={logout}></Button>
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
    maxHeight: 200,
    width: "100%",
    resizeMode: "cover",
  },
  user: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
    bottom: 30,
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
