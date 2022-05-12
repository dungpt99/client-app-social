import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import HomeScreen from "../BottomNavigation/HomeScreen";
import { API_BASE_URL } from "../../config/urls";
import { useFocusEffect } from "@react-navigation/native";
import { findAllFriend, createFriend, removeFriend } from "../../api/relation"
import { createConversation } from "../../api/conversation"

export default function ProfileDetail({ navigation, route }) {
  const { name, avatar, imgCover, id } = route.params;
  const [followed, setFollowed] = useState(false);
  const [conversation, setConversation] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchFriend = async () => {
        try {
          const res = await findAllFriend();
          res.data.forEach((e) => {
            if (e.id === id) {
              setFollowed(true);
            }
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchFriend();
    }, [id])
  );

  const handleClick = async () => {
    if (!followed) {
      try {
        await createFriend({
          follow: id,
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = { follow: id }
        await removeFriend({ data });
      } catch (error) {
        console.log(error);
      }
    }
    setFollowed(!followed);
  };

  const handleChat = async () => {
    try {
      const res = await createConversation({
        receiverId: id,
      })
      console.log(res.data);
      if (Array.isArray(res.data)) {
        navigation.navigate("Conversation", res.data[0]);
      } else {
        navigation.navigate("Conversation", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              source={{
                uri: avatar || API_BASE_URL + "/assets/person/noavatar.png",
              }}
              style={styles.avatar}
            ></Image>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.button}>
            <Button
              title={followed ? "UnFollow" : "Follow"}
              onPress={handleClick}
            ></Button>
            <Button title="Chat" onPress={handleChat}></Button>
          </View>
        </View>
        <HomeScreen userId={id} />
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
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    bottom: -10,
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    left: 110,
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
