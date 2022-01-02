import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Share from "../../components/Share";
import Post from "../../components/Post";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/urls";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ userId, navigation }) {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const res = userId
          ? await axios.get(`${API_BASE_URL}/post/profile/` + userId)
          : await axios.get(`${API_BASE_URL}/post/timeline`);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      }
      fetchData();
    }, [userId])
  );

  const shareScreen = () => {
    navigation.navigate("Share");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={shareScreen} activeOpacity={1}>
        <Share style={styles.share} />
      </TouchableOpacity>
      <ScrollView>
        {posts.map((item) => (
          <View key={item.id}>
            <Post post={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "92%",
  },
  share: {
    height: 100,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "red",
    marginTop: 10,
  },
});
