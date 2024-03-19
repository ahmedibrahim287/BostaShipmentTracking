// network/axiosInstance.ts
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://tracking.bosta.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
