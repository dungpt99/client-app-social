import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import validator from "../../utils/validation";
import { showError, showSuccess } from "./HelperFunction";
import actions from "../../redux/actions";
import store from "../../redux/store";
import types from "../../redux/types";
import { loginCall } from "../../apiCall";

export default function Login({ navigation }) {
  const { dispatch } = store;
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    isSecure: true,
  });

  const { isLoading, email, password, isSecure } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const isValidData = () => {
    const error = validator({ email, password });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      try {
        loginCall(
          {
            email,
            password,
          },
          dispatch
        );
      } catch (error) {
        console.log("error");
        showError(error.message);
      }
      // navigation.navigate("Main");
    }
  };

  const onSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Social</Text>
        <Text style={styles.desc}>Connect to people around the world</Text>
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={(email) => updateState({ email })}
          style={styles.textInput}
        />
        <Text style={styles.inputLabel}>Password:</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => updateState({ password })}
          style={styles.textInput}
        />
      </View>
      <View style={styles.login}>
        <Button title="Login" onPress={onLogin}></Button>
      </View>
      <View style={styles.createAccount}>
        <Button
          title="Create an account"
          color="green"
          onPress={onSignup}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: { textAlign: "left" },
  inputLabel: { marginTop: 12, fontSize: 16, marginBottom: 10 },
  top: { marginBottom: 30 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center" },
  desc: { fontSize: 20, textAlign: "center" },
  textInput: {
    width: 250,
    height: 40,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderColor: "#333",
    borderRadius: 5,
  },
  createAccount: { marginTop: 10 },
  login: { marginTop: 20 },
});
