import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { API_BASE_URL } from "../config/urls";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Message from "./Message";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Conversation({ navigation, route }) {
  const scrollRef = useRef();
  const { id } = route.params;
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [receiver, setReceiver] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const getUser = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/conversation/user/` + id
          );
          const friend = res.data[0].users.find((m) => m.id !== userData.id);
          setReceiver(friend);
        } catch (error) {}
      };
      getUser();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const getMessage = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/messages/` + id);
          setMessages(res.data);
        } catch (error) {}
      };

      getMessage();
    }, [id])
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // socket.emit("sendMessage", {
      //   senderId: user.id,
      //   receiverId: friend.id,
      //   content: newMessage,
      // });

      const newContent = {
        content: newMessage,
        receiverId: receiver.id,
      };

      const res = await axios.post(`${API_BASE_URL}/messages`, newContent);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <Image
          source={{
            uri:
              receiver.avatar || API_BASE_URL + "/assets/person/noavatar.png",
          }}
          style={styles.img}
        ></Image>
        <View>
          <Text style={styles.name}>{receiver?.name}</Text>
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: false })
        }
      >
        {messages !== null
          ? messages?.map((m) => (
              <Message message={m} key={m.id} own={m.user.id === userData.id} />
            ))
          : null}
      </ScrollView>
      <View style={styles.box}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setNewMessage(text)}
          value={newMessage}
        />
        <MaterialCommunityIcons
          name="send"
          color={"#03bafc"}
          size={50}
          onPress={handleSubmit}
        />
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
