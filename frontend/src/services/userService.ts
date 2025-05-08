// src/services/userService.ts

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getUserProfile = async (token: string) => {
  const res = await axios.get(`${API}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserProfile = async (data: any, token: string) => {
  const res = await axios.put(`${API}/users/me`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const changePassword = async (data: any, token: string) => {
  const res = await axios.put(`${API}/users/change-password`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
