// src/app/lib/axios.ts
import axios from "axios";

const api = axios.create({
  // Remover baseURL o usar la URL base de la API externa
  baseURL: "https://api.andeshire.com", // URL base de la API externa
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;