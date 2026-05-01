import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://findhere.onrender.com";

const api = axios.create({
  baseURL: API_BASE.replace(/\/+$/, ""),
});

export default api;
export { API_BASE };