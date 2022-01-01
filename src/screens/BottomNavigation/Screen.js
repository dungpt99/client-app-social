import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

export default function Screen({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#f7f3f3",
    flex: 1,
  },
});
