import axios from '../utils/axios';
import { API_BASE_URL } from '../config/urls';

export const createMessage = (data) => axios.post(`${API_BASE_URL}/messages`, data);

export const findAllMessage = () => axios.get(`${API_BASE_URL}/messages`);

export const findMessage = (id) => axios.get(`${API_BASE_URL}/messages/${id}`);

export const updateMessage = (id, data) => axios.put(`${API_BASE_URL}/messages/${id}`, data);

export const removeMessage = (id) => axios.delete(`${API_BASE_URL}/messages/${id}`);