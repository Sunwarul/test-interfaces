import axios, { type AxiosInstance } from "axios";
import { env } from "@/config/env";
import { useAuthStore } from "@/store/auth.store";

/**
 * Shared Axios client with automatic Bearer token injection.
 * The request interceptor reads the access token from the auth store
 * and adds it to every outgoing request.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: inject Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      useAuthStore.getState().actions.clearSession();
    }
    return Promise.reject(error);
  }
);

export { apiClient };