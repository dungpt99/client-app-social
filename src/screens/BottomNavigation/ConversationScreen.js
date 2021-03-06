import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
  Text
} from "react-native";
import UserConversation from "../../components/UserConversation";
import { findAllConversation } from "../../api/conversation";

export default function ConversationScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getConversation = async () => {
        const res = await findAllConversation({ page:1, pageSize: 10});
        setConversations([])
        setConversations(res.data);
      };
      getConversation();
    }, [])
  );
    
  const Item = ({ data }) => (
    <UserConversation data={data}/>
  );

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("Conversation", item)}>
      <Item data={item} />
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
