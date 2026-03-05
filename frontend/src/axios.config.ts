import axios from "axios";

export const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})