import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Button,
  Pressable,
} from "react-native";
import { API_BASE_URL } from "../../config/urls";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PeopleScreen({ navigation }) {
  const [friends, setFriends] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useFocusEffect(
    React.useCallback(() => {
      const getFriends = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/user`);
          let listFriend = [];
          res.data.forEach((element) => {
            if (element.id !== userData.id) {
              listFriend.push(element);
            }
          });
          setFriends(listFriend);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }, [])
  );

  const Item = ({ data }) => (
    <View style={styles.item}>
      <View style={styles.information}>
        <Image
          source={{
            uri: data.avatar || API_BASE_URL + "/assets/person/noavatar.png",
          }}
          style={styles.img}
        ></Image>
        <Text style={styles.name}>{data.name}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("ProfileDetail", item)}>
      <Item data={item} />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
  },
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
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
  },
});
