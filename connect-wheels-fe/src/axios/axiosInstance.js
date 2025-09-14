import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Optional: Add auth token if exists
    const token = localStorage.getItem("token"); // Will be null if not set
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.status, error.message);
    // Example: handle 401 globally
    if (error.response?.status === 401) {
      console.log("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
