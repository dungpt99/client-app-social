import axios from '../utils/axios';
import { API_BASE_URL } from '../config/urls';

export const createConversation = (data) => axios.post(`${API_BASE_URL}/conversations`, data);

export const findAllConversation = () => axios.get(`${API_BASE_URL}/conversations`);

export const findConversation = (id) => axios.get(`${API_BASE_URL}/conversations/${id}`);

export const updateConversation = (id, data) => axios.put(`${API_BASE_URL}/conversations/${id}`, data);

export const removeConversation = (id) => axios.delete(`${API_BASE_URL}/conversations/${id}`);