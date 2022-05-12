import axios from '../utils/axios';
import { API_BASE_URL } from '../config/urls';

export const createFriend = (data) => axios.post(`${API_BASE_URL}/friends`, data);

export const findAllFriend = () => axios.get(`${API_BASE_URL}/friends`);

export const findFriend = (id) => axios.get(`${API_BASE_URL}/friends/${id}`);

export const updateFriend = (id, data) => axios.put(`${API_BASE_URL}/friends/${id}`, data);

export const removeFriend = (data) => axios.delete(`${API_BASE_URL}/friends`, data);