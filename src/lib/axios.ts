import axios from "axios";

const api = axios.create({
  baseURL: "https://7s188gjl82.execute-api.sa-east-1.amazonaws.com/test", 
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 0,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
