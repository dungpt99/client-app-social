import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";

export default function PeopleScreen() {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d7",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d272",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d372",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd145571e29d72",
      title: "Third Item",
    },
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <View style={styles.information}>
        <Image
          source={require("../../../public/images/noavatar.png")}
          style={styles.img}
        ></Image>
        <Text style={styles.name}>Phung Dung</Text>
      </View>
      <Text style={styles.title}>Follow</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
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
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
  },
});
