import axios from "axios";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Gắn token vào mọi request nếu có
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
}

const http = new Http().instance;

export default http;
