import React from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";

export default function Share() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../public/images/noavatar.png")}
        style={styles.img}
      ></Image>
      <TextInput placeholder="Share ..." style={styles.input} />
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
  },
});
