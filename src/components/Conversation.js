import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { API_BASE_URL } from "../config/urls";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Message from "./Message";

export default function Conversation() {
  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <Image
          source={{
            uri: API_BASE_URL + "/assets/person/noavatar.png",
          }}
          style={styles.img}
        ></Image>
        <View>
          <Text style={styles.name}>Phung Dung</Text>
        </View>
      </View>
      <ScrollView>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </ScrollView>
      <View style={styles.box}>
        <TextInput style={styles.textInput} />
        <MaterialCommunityIcons name="send" color={"#03bafc"} size={50} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#f7f3f3",
    flex: 1,
  },
  information: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
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
  box: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  textInput: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
  },
});
