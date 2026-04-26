import axios from "axios";

const DEFAULT_BASE =  import.meta.VITE_API_BASE_URL;
const rawBase = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE;
const API_BASE = String(rawBase).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE,
});

export { API_BASE };
export default api;
