// src/services/historyService.ts

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getHistory = async (token: string) => {
  const res = await axios.get(`${API}/conversions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateHistoryItem = async (
  id: string,
  data: any,
  token: string
) => {
  const res = await axios.put(`${API}/conversions/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteHistoryItem = async (id: string, token: string) => {
  const res = await axios.delete(`${API}/conversions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
