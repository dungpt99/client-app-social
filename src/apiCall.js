import axios from "axios";
import actions from "./redux/actions";
import * as SecureStore from "expo-secure-store";
import types from "./redux/types";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: types.LOGIN_START });
  try {
    const res = await actions.login(userCredential);
    await SecureStore.setItemAsync("accessToken", res.data.accessToken);
    await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${res.data.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const user = await axios.get(
      "https://socialserver12-2021.herokuapp.com/user/current"
    );
    dispatch({ type: types.LOGIN_SUCCESS, payload: user.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};
