import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import Share from "../../components/Share";
import HomeScreen from "./HomeScreen";
import { API_BASE_URL } from "../../config/urls";

export default function ProfileScreen() {
  const userData = useSelector((state) => state.auth.userData);
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
});
