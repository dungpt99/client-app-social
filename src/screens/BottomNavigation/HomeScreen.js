import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Post from "../../components/Post";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getProfile, getTimeLine } from '../../api/post'
import Share from "../../components/Share";

export default function HomeScreen({ userId, navigation }) {
  const [posts, setPosts] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const res = userId ? await getProfile(userId) : await getTimeLine();
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
      {
        !userId && 
        (<TouchableOpacity onPress={shareScreen} activeOpacity={1}>
          <Share style={styles.share} />
        </TouchableOpacity>)
      }
      <ScrollView scrollsToTop={true}>
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
