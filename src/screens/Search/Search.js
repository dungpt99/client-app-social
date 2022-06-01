import { View, TextInput, StyleSheet, StatusBar, ScrollView, Text, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { findAllPost } from '../../api/post'
import { useFocusEffect } from "@react-navigation/native";
import Post from '../../components/Post';

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState({page:1, pageSize:20})
  const [text, setText] = useState("")
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const res = await findAllPost(query);
        setPosts(res.data.data);
      }
      fetchData();
    }, [query])
  );

  const tagNew = () => {
    setQuery({page:1, pageSize:20, order: "DESC"})
  }

  const tagOld = () => {
    setQuery({page:1, pageSize:20, order: "ASC"})
  }

  const tagPopular = () => {
    setQuery({page:1, pageSize:20, top: "top"})
  }

  const textInputOut = () => {
    setQuery({page:1, pageSize:20, order: "DESC", search: text})
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput placeholder='Search here...' style={styles.textInput} onEndEditing={textInputOut} onChangeText={(text) => setText(text)}/>
      </View>
      <View style={styles.tags}>
        <TouchableOpacity onPress={tagNew}> 
          <Text style={styles.tag}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={tagOld}> 
          <Text style={styles.tag}>Old</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={tagPopular}>
          <Text style={styles.tag}>Popular</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView scrollsToTop={true}>
          {posts.map((item) => (
            <View key={item.id}>
              <Post post={item} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    height: "100%",
  },
  textInput: {
    fontSize:18
  },
  tags: {
    flexDirection: 'row',
    width: "100%",
    marginTop: 10,
    marginBottom:10,
  },
  tag: {
    borderRadius: 50,
    backgroundColor: "#F2EBE9",
    padding: 10,
    color: "#333",
    fontSize: 16,
    marginRight: 10
  }
});