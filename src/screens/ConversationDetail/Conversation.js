import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { API_BASE_URL } from "../../config/urls";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Message from "../../components/Message";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { findConversation } from "../../api/conversation";
import { createMessage, findMessage } from "../../api/message";
import socket from "../../utils/socket";

export default function Conversation({ navigation, route }) {
  const scrollRef = useRef();
  const { id } = route.params;
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [receiver, setReceiver] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  let count = 0;

  useFocusEffect(
    React.useCallback(() => {
      const getMessage = async () => {
        try {
          const message = await findMessage(id);
          const conversation = await findConversation(id);
          const friend = conversation.data.users.find((m) => m.id !== userData.id);
          setReceiver("");
          setMessages(null);
          setReceiver(friend);
          setMessages(message.data);
        } catch (error) {
          console.log(error);
        }
      };
      getMessage();
      socket.emit("addUser", userData.id);
    }, [id])
  );

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        user: { id: data.senderId },
        content: data.content,
      });
    });
  }, [count]);

  useFocusEffect(
    React.useCallback(() => {
      const getMessage = async () => {
        try {
          arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
          setArrivalMessage(null);
        } catch (error) {
          console.log(error);
        }
      };
      getMessage();
    }, [arrivalMessage])
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', newMessage);
      formData.append('conversationId', id);

      const res = await createMessage(formData);
      
      socket.emit("sendMessage", {
        senderId: userData.id,
        receiverId: receiver.id,
        content: newMessage,
      });
      socket.on("getMessage", (data) => {
        setArrivalMessage(null);
        setArrivalMessage({
          user: { id: data.senderId },
          content: data.content,
        });
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
      count +=1;
    } catch (error) {
      console.log(error);
    }
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
          ? messages?.map((m, index) => (
              <Message message={m} key={index} own={m.user.id === userData.id} />
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
