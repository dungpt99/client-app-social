import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/urls";

export default function Share() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={{
            uri: userData.avatar || API_BASE_URL + "/assets/person/noavatar.png",
          }}
          style={styles.img}
        ></Image>
      </View>
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
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    justifyContent: "space-between"
  },
  avatar: {

  },
  img: {
    height: 45,
    width: 45,
    resizeMode: "cover",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "gray",
  },
  input: {
    borderColor: "gray",
    width:"80%",
    borderWidth: 1,
    marginLeft: 5,
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
    color: "#ccc",
  },
});
