import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Message({ message, own }) {
  return (
    <View style={own ? styles.containerOwn : styles.container}>
      <Text style={own ? styles.own : styles.text}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  containerOwn: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 50,
    color: "#333",
    marginTop: 20,
    marginLeft: 10,
    textAlign: "left",
  },
  own: {
    fontSize: 20,
    backgroundColor: "#035efc",
    color: "#fff",
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
    textAlign: "left",
    marginRight: 10,
  },
});
