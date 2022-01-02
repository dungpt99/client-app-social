import React from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/urls";

export default function Share() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: userData.avatar || API_BASE_URL + "/assets/person/noavatar.png",
        }}
        style={styles.img}
      ></Image>
      <Text style={styles.input}>Share ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
  },
  img: {
    height: 45,
    width: 45,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    marginLeft: 5,
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
    color: "#ccc",
  },
});
