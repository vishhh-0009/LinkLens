import axios from "axios";

const API = "http://localhost:5000/api/links";

export const createShortLink = async (data) => {
  const response = await axios.post(`${API}/shorten`, data);
  return response.data;
};
export const getAnalytics = async () => {
  const response = await axios.get(`${API}/analytics`);
  return response.data;
};
export const getAllLinks = async () => {
  const response = await axios.get(`${API}/all`);
  return response.data;
};
export const getQRCode = async (shortCode) => {
  const response = await axios.get(`${API}/qr/${shortCode}`);
  return response.data;
};
