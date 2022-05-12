import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { API_BASE_URL } from "../config/urls";
import TimeAgo from "./Time";
import { useFocusEffect } from "@react-navigation/native";
import { findLike, findLikeCurrent, createLike, removeLike } from "../api/like";

export default function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(1);

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
      <Text style={styles.content}>{post.desc}</Text>
      {post.img && (
        <Image
          source={{
            uri: API_BASE_URL + post.img,
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
  information: { flexDirection: "row" },
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
    fontSize: 20,
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
});
