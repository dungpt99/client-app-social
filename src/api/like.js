import axios from '../utils/axios';
import { API_BASE_URL } from '../config/urls';

export const createLike = (data) => axios.post(`${API_BASE_URL}/like`, data);

export const findAllLike = () => axios.get(`${API_BASE_URL}/like`);

export const findLike = (id) => axios.get(`${API_BASE_URL}/like/${id}`);

export const findLikeCurrent = (id) => axios.get(`${API_BASE_URL}/like/current/${id}`);

export const removeLike = (data) => axios.delete(`${API_BASE_URL}/like`, data);