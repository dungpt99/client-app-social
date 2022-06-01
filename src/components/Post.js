import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput
} from "react-native";
import { API_BASE_URL } from "../config/urls";
import TimeAgo from "./Time";
import { useFocusEffect } from "@react-navigation/native";
import { findLike, findLikeCurrent, createLike, removeLike } from "../api/like";
import { Video } from 'expo-av';

export default function Post({ post }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(1);
  const video = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const res = await findLike(post.id);
        setLike(res.data.length);
      };
      fetchData();
    }, [post.id])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const res = await findLikeCurrent(post.id);
        if (Object.entries(res.data).length !== 0) {
          setIsLiked(true);
        }
      };
      fetchData();
    }, [post.id])
  );

  const likeHandler = async () => {
    if (!isLiked) {
      try {
        const data = {
          postId: post.id,
        };
        await createLike(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = {
          postId: post.id,
        };
        await removeLike({data});
      } catch (error) {
        console.log(error);
      }
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <View style={styles.informationUser}>
          <Image
            source={{
              uri:
                post.user.avatar || API_BASE_URL + "/assets/person/noavatar.png",
            }}
            style={styles.img}
          ></Image>
          <View>
            <Text style={styles.name}>{post.user.name}</Text>
            <TimeAgo time={post.createdAt} />
          </View>
        </View>
        <View >
          <Pressable onPress={() => {
            setModalVisible(true)
          }}>
          <Text style={styles.informationCoin}>
            {post.coin}
          </Text>
          </Pressable>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput style={styles.modalText} placeholder={"Send coin"}></TextInput>
                <View style={styles.buttonModel}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible)
                    }}
                  >
                    <Text style={styles.textStyle}>Donate</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <Text style={styles.content}>{post.desc}</Text>
      {post.images[0] && post.images[0].url && post.images[0].url.includes('mp4') && (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: API_BASE_URL + '/uploads/' + post.images[0].url,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      )}
      {post.images[0] && post.images[0].url && !post.images[0].url.includes('mp4') &&(
        <Image
          source={{
            uri: API_BASE_URL + '/uploads/' + post.images[0].url,
          }}
          style={styles.imgContent}
        ></Image>
      )}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={likeHandler} activeOpacity={0.9}>
          <Image
            source={{ uri: API_BASE_URL + "/assets/post/heart.png" }}
            style={styles.react}
          ></Image>
        </TouchableOpacity>
        <Text>{like} people like it</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 5,
  },
  information: { flexDirection: "row", justifyContent: "space-between" },
  informationUser: { flexDirection: "row" },
  informationCoin: { color:"red", fontSize:20, paddingLeft: 10, paddingRight: 10 },
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
  content: {
    marginTop: 5,
    fontSize: 16,
  },
  imgContent: {
    marginTop: 5,
    width: "100%",
    resizeMode: "cover",
    height: 200,
  },
  bottom: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  react: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  video: {
    alignSelf: 'center',
    width: "100%",
    height: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 100
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10
  },
  buttonModel:{
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});
