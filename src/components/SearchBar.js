import React, { useState } from "react";
import { View, StyleSheet, Image, Text,Modal,Pressable,Linking,TouchableOpacity } from "react-native";
import { userCurrent } from '../api/user'
import { useFocusEffect } from "@react-navigation/native";
import { API_BASE_URL } from "../config/urls";

export default function SearchBar({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [coin, setCoin] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const res = await userCurrent();
        setCoin(res.data.asset)
      }
      fetchData();
    }, [modalVisible])
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.searchInput}>
          <TouchableOpacity onPressIn={() => navigation.navigate("Search")}>
            <Text style={styles.textInput}>Search here...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}>
          <Pressable onPress={() => {
            setModalVisible(true)
          }}>
            <Image source={require("../../public/images/coin2.png")} style={styles.imgCoin}></Image>
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
                <Text style={styles.modalText}>{coin}</Text>
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
                      Linking.openURL(`${API_BASE_URL}/vnpay_login`)
                      setModalVisible(!modalVisible)
                    }}
                  >
                    <Text style={styles.textStyle}>Recharge</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  },
  navBar:{
    flexDirection: "row",
    width:"100%",
    justifyContent: "space-between",
    alignItems:"center"
  },
  searchInput: {
    width: "80%",
    height: "100%",
    fontSize: 20,
  },
  textInput: {
    width: "100%",
    height: "100%",
    fontSize: 18,
    marginTop:15,
    color: "gray"
  },
  imgContainer: {
    width: "10%",
    height: "80%",
  },
  imgCoin: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  centeredView: {
    justifyContent: "center",
    marginTop: 22
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
    fontSize:20
  },
  buttonModel:{
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});
