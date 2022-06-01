import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Button,
  Picker
} from "react-native";
import { API_BASE_URL } from "../../config/urls";
import { useSelector } from "react-redux";
import { findAllUser } from "../../api/user";

const People = function PeopleScreen({ navigation }) {
  const [friends, setFriends] = useState([]);
  const [address, setAddress] = useState('');
  const [coin, setCoin] = useState('');
  const userData = useSelector((state) => state.auth.userData);
  useFocusEffect(
    React.useCallback(() => {
      const getFriends = async () => {
        try {
          const res = await findAllUser({ page:1, pageSize: 10 });
          let listFriend = [];
          res.data.data.map((element) => {
            if (element.id !== userData.id) {
              listFriend.push(element);
            }
          });
          setFriends(listFriend);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }, [])
  );

  const Item = ({ data }) => (
    <View style={styles.item}>
      <View style={styles.information}>
        <Image
          source={{
            uri: data.avatar || API_BASE_URL + "/assets/person/noavatar.png",
          }}
          style={styles.img}
        ></Image>
        <Text style={styles.name}>{data.name}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("ProfileDetail", item)}>
      <Item data={item} />
    </Pressable>
  );

  const send = () => {
    console.log(address);
    console.log(coin);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sendCoinContainer}>
        <View style={styles.inputCoinContainer}>
          <Text>
            Coin:
          </Text>
          <TextInput placeholder="Input coin" style={styles.inputCoin} onChangeText={(text) => setCoin(text)}/>
        </View>
        <View style={styles.pickerContainer}>
          <Text>
            To:
          </Text>
          <View >
          <Picker
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setAddress(itemValue)
            }>
            {
              friends.map(e => 
                (<Picker.Item label={e.name} value={e.address} key={e.id}/>)
              )
            }
          </Picker>
          </View>
        </View>
        <View>
          <Button title="Send" onPress={send}/>
        </View>
      </View>
      <FlatList
        data={friends}
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
  sendCoinContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputCoinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputCoin: {
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    borderRadius: 5
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  picker: {
    width: 100,
    height: 50,
    color: "black"
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

export default React.memo(People)