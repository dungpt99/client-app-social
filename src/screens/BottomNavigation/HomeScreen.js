import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Share from "../../components/Share";
import Post from "../../components/Post";

export default function HomeScreen() {
  const [people, setPeople] = useState([
    { name: "Tung", key: 1 },
    { name: "Nam", key: 2 },
    { name: "Dung", key: 3 },
  ]);
  return (
    <View style={styles.container}>
      <Share style={styles.share} />
      <ScrollView>
        {people.map((item) => (
          <View key={item.key}>
            <Post people={item} />
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
