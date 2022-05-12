import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { API_BASE_URL } from "../../config/urls";
import { useSelector } from "react-redux";
import { findAllUser } from "../../api/user";

export default function PeopleScreen({ navigation }) {
  const [friends, setFriends] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  useFocusEffect(
    React.useCallback(() => {
      const getFriends = async () => {
        try {
          const res = await findAllUser({ page:1, pageSize: 10 });
          let listFriend = [];
          res.data.data.map((element) => {
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
    height: "95%",
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
