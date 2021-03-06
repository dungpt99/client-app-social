import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  Button,
  PermissionsAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { API_BASE_URL } from "../../config/urls";
import { useSelector } from "react-redux";

export default function ShareScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const handleChoosePhoto = async () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setImage(result.uri);
          }
        }
      }
    })();
  };

  const handleCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleClose = () => {
    setImage(null);
  };

  const handleShare = async () => {
    let localUri = image;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    if (image) {
      const data = new FormData();
      data.append("file", { uri: localUri, name: filename, type });
      data.append("desc", text);
      try {
        await axios.post(`${API_BASE_URL}/post/uploads`, data);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(`${API_BASE_URL}/post`, { desc: text });
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewInfo}>
        <Image
          source={{
            uri:
              userData.avatar || API_BASE_URL + "/assets/person/noavatar.png",
          }}
          style={styles.img}
        ></Image>
        <Text style={styles.name}>{userData.name}</Text>
      </View>
      <TextInput
        placeholder="Share ..."
        style={styles.input}
        onChangeText={(text) => setText(text)}
      ></TextInput>
      {!image && (
        <View style={styles.upload}>
          <MaterialCommunityIcons
            name="folder-image"
            color={"red"}
            style={styles.icon}
            onPress={handleChoosePhoto}
          />
          <Text style={styles.textIcon}>???nh</Text>
          <MaterialCommunityIcons
            name="emoticon"
            color={"yellow"}
            style={styles.icon}
          />
          <Text style={styles.textIcon}>C???m x??c</Text>
          <MaterialCommunityIcons
            name="camera"
            style={styles.icon}
            onPress={handleCamera}
          />
          <Text style={styles.textIcon}>M??y ???nh</Text>
        </View>
      )}
      {image && (
        <View style={styles.viewUpload}>
          <MaterialCommunityIcons
            name="close"
            color={"black"}
            style={styles.closeIcon}
            onPress={handleClose}
          />
          <Image source={{ uri: image }} style={styles.imgUpload} />
        </View>
      )}
      <Button title="Share" onPress={handleShare}></Button>
    </View>
  );
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
  name: { fontSize: 20, marginLeft: 10 },
  viewInfo: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  viewUpload: {
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    fontSize: 30,
    zIndex: 1,
    opacity: 0.5,
  },
  upload: { flexDirection: "row", alignItems: "center" },
  icon: {
    fontSize: 50,
  },
  textIcon: {
    fontSize: 20,
  },
  imgUpload: {
    width: "100%",
    height: 200,
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
  input: {
    borderColor: "gray",
    width: "100%",
    marginLeft: 5,
    fontSize: 20,
    color: "#333",
    marginTop: 20,
  },
});
