import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../config/urls";
import UserConversation from "../../components/UserConversation";

export default function ConversationScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getConversation = async () => {
        const res = await axios.get(`${API_BASE_URL}/conversation`);
        setConversations(res.data);
      };
      getConversation();
    }, [])
  );

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("Conversation", item)}>
      <UserConversation data={item} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
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
