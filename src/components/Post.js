import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Post({ people }) {
  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <Image
          source={require("../../public/images/noavatar.png")}
          style={styles.img}
        ></Image>
        <View>
          <Text style={styles.name}>{people.name}</Text>
          <Text>1 hours ago</Text>
        </View>
      </View>
      <Text style={styles.content}>Good moring</Text>
      <Image
        source={require("../../public/images/noavatar.png")}
        style={styles.imgContent}
      ></Image>
      <View style={styles.bottom}>
        <Image
          source={require("../../public/images/heart.png")}
          style={styles.react}
        ></Image>
        <Text>1 people like it</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 5,
  },
  information: { flexDirection: "row" },
  name: {
    fontSize: 18,
    fontWeight: "bold",
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
  content: {
    marginTop: 5,
    fontSize: 20,
  },
  imgContent: {
    width: "100%",
    resizeMode: "cover",
  },
  bottom: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  react: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});
