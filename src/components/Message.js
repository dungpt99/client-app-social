import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Message({ own }) {
  return (
    <View style={styles.container}>
      <Text style={styles.own}>hhhhhhhhhhhhhhhhhhhhhhhhhhhh</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    flexShrink: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
    maxWidth: "80%",
    marginLeft: 10,
  },
  own: {
    fontSize: 20,
    backgroundColor: "#035efc",
    color: "#fff",
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
    maxWidth: "80%",
    marginRight: 0,
    textAlign: "left",
  },
});
