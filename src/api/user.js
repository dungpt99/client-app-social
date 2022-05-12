import axios from '../utils/axios';
import { API_BASE_URL } from '../config/urls';

export const signUp = (data) => axios.post(`${API_BASE_URL}/users`, data);

export const findAllUser = (params) => axios.get(`${API_BASE_URL}/users`, { params });

export const findUser = (id) => axios.get(`${API_BASE_URL}/users/${id}`);

export const userCurrent = () => axios.get(`${API_BASE_URL}/users/current`);

export const updateUser = (id, data) => axios.put(`${API_BASE_URL}/users/${id}`, data);

export const removeUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);