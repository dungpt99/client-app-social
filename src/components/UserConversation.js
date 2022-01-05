import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/urls";
import axios from "axios";

export default function UserConversation({ data }) {
  const [receiver, setReceiver] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  useFocusEffect(
    React.useCallback(() => {
      const getUser = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/conversation/user/` + data.id
          );
          const friend = res.data[0].users.find((m) => m.id !== userData.id);
          setReceiver(friend);
        } catch (error) {}
      };
      getUser();
    }, [])
  );
  return (
    <View style={styles.item}>
      <View style={styles.information}>
        <Image
          source={require("../../public/images/noavatar.png")}
          style={styles.img}
        ></Image>
        <Text style={styles.name}>{receiver.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  information: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontSize: 18 },
  img: {
    height: 45,
    width: 45,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
  },
});
