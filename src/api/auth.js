import axios from '../utils/axios';
import { API_BASE_URL } from '../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import types from "../redux/types";

export const signOut = async (dispatch) => {
  try {
    await axios.post(`${API_BASE_URL}/logout`);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    axios.defaults.headers.common.Authorization = '';
    dispatch({ type: types.CLEAR_REDUX_STATE, payload: {} });
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
}

export const signIn = async (userCredential, dispatch) => {
  dispatch({ type: types.LOGIN_START });
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, userCredential);
    await AsyncStorage.setItem('accessToken', res.data.accessToken);
    await AsyncStorage.setItem('refreshToken', res.data.accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};