import axios from 'axios';
import { API_BASE_URL } from '../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

let options = {
  baseURL: API_BASE_URL,
};

(async () => {
  try {
    const value = await AsyncStorage.getItem('accessToken')
    if(value !== null) {
      axios.defaults.headers.common.Authorization = '';
    }
    axios.defaults.headers.common.Authorization = `Bearer ${value}`;
  } catch(e) {
    console.log(e);
  }
})()


export default axios.create(options);
