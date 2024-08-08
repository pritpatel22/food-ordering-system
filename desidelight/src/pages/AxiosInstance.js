import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", // Adjust according to your backend URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
