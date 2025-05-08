// src/services/adminService.ts

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAllUsers = async (token: string) => {
  const res = await axios.get(`${API}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
