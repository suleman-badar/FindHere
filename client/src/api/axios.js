import axios from "axios";

const raw = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_API_BASE = "https://findhere.onrender.com";
const API_BASE = raw && raw !== "undefined" && raw !== "null" ? raw : DEFAULT_API_BASE;
const baseURL = API_BASE.replace(/\/+$/, "");

const api = axios.create({
  baseURL,
});

// Include credentials by default for backend calls
api.defaults.withCredentials = true;

export default api;
export { API_BASE, baseURL };