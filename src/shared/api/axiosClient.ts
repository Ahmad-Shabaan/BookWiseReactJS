// # Configured axios instance
// src/api/axiosClient.js
import axios from "axios";
import { config } from "@/config/env";
import { store } from "@/store/store";
import { clearUser } from "@/features/auth/store/authSlice";

const axiosClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true, // ✅ sends cookies automatically
});

// ✅ Attach CSRF token to every mutating request
axiosClient.interceptors.request.use((config) => {
  const csrf = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrf_token="))
    ?.split("=")[1];

  if (csrf) config.headers["X-CSRF-TOKEN"] = csrf;
  return config;
});

// ✅ Handle 401 globally — auto logout
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Try refresh once on 401
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await axiosClient.post("/account/refresh-token");
        return axiosClient(original); // retry original request
      } catch {
        store.dispatch(clearUser()); // refresh failed → logout
      }
    }
    if (!error.response) {
      error.message = "Server is unreachable. Please try again later.";
      // return Promise.reject({
      //   response: {
      //     data: {
      //       message: "Server is unreachable",
      //     },
      //   },
      //   type: "SERVER_DOWN",
      //   message: "Server is unreachable",
      // });
    }
    return Promise.reject(error);
  },
);
export default axiosClient;
