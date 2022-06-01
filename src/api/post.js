import axios from '../utils/axios';
import { API_BASE_URL } from '../config/urls';

export const createPost = (data) => axios.post(`${API_BASE_URL}/posts`, data);

export const findAllPost = (query) => axios.get(`${API_BASE_URL}/posts`, {params : query });

export const findPost = (id) => axios.get(`${API_BASE_URL}/posts/${id}`);

export const updatePost = (id, data) => axios.put(`${API_BASE_URL}/posts/${id}`, data);

export const removePost = (id) => axios.delete(`${API_BASE_URL}/posts/${id}`);

export const getProfile = (id) => axios.get(`${API_BASE_URL}/posts/profile/${id}`);

export const getTimeLine = () => axios.get(`${API_BASE_URL}/posts/timeline`);