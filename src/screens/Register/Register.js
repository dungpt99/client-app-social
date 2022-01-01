import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import { showError } from "../Login/HelperFunction";
import { API_BASE_URL } from "../../config/urls";
import axios from "axios";
import validator from "../../utils/validation";

export default function Register({ navigation }) {
  const [state, setState] = useState({
    name: "",
    isLoading: false,
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { name, isLoading, email, password, repeatPassword } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const isValidData = () => {
    const error = validator({ name, email, password });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onSignup = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      if (repeatPassword != password) {
        showError("Password don't match");
      } else {
        updateState({ isLoading: false });
        const user = {
          name,
          email,
          password,
        };
        try {
          const res = await axios.post(`${API_BASE_URL}/user`, user);
          updateState({ isLoading: true });
          navigation.goBack();
        } catch (error) {
          console.log(error);
          updateState({ isLoading: false });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Social</Text>
        <Text style={styles.desc}>Connect to people around the world</Text>
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          onChangeText={(name) => updateState({ name })}
        />
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          style={styles.textInput}
          onChangeText={(email) => updateState({ email })}
        />
        <Text style={styles.inputLabel}>Password:</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(password) => updateState({ password })}
        />
        <Text style={styles.inputLabel}>RepeatPassword:</Text>
        <TextInput
          placeholder="RepeatPassword"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(repeatPassword) => updateState({ repeatPassword })}
        />
      </View>
      <View style={styles.signup}>
        <Button title="Signup" onPress={onSignup}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#f7f3f3",
    flex: 1,
  },
  top: { marginBottom: 30 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center" },
  desc: { fontSize: 20, textAlign: "center" },
  input: { marginHorizontal: 80 },
  inputLabel: { marginTop: 12, fontSize: 16, marginBottom: 10 },
  textInput: {
    width: 250,
    height: 40,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderColor: "#333",
    borderRadius: 5,
  },
  signup: {
    marginHorizontal: 120,
    marginTop: 30,
  },
});
