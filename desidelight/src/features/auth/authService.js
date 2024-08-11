// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const register = (userData) => {
  return axios.post(API_URL + "register/", userData);
};

export const login = (userData) => {
  return axios.post(API_URL + "login/", userData);
};

export const getProfile = (token) => {
  return axios.get(API_URL + "profile/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = (token, userData) => {
  return axios.put(API_URL + "profile/", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
