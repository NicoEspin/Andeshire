import axios from "axios";

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current domain with /api/v1
    return `${window.location.origin}/api/v1`;
  }
  
  // Server-side fallback to AWS endpoint
  return "https://7s188gjl82.execute-api.sa-east-1.amazonaws.com/test";
};

const api = axios.create({
  baseURL: getBaseURL(),
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
