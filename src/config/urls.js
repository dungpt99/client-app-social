export const API_BASE_URL = "https://socialserver12-2021.herokuapp.com";

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const LOGIN = getApiUrl("/login");
