import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Post from "../../components/Post";
import Share from "../../components/Share";

export default function ProfileScreen() {
  const [people, setPeople] = useState([
    { name: "Tung", key: 1 },
    { name: "Nam", key: 2 },
    { name: "Dung", key: 3 },
  ]);
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
              source={require("../../../public/images/noavatar.png")}
              style={styles.avatar}
            ></Image>
            <Text style={styles.name}>Phung Dung</Text>
          </View>
        </View>
        <Share />
        {people.map((item) => (
          <View key={item.key}>
            <Post people={item} />
          </View>
        ))}
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
