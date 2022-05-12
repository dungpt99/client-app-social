import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, } from "react-native";
import validator from "../../utils/validation";
import { showError } from "./HelperFunction";
import store from "../../redux/store";
import { signIn } from "../../api/auth";

export default function Login({ navigation }) {
  const { dispatch } = store;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
        signIn(
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
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={() => {
            onLogin(email, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
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
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});
