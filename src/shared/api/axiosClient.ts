// # Configured axios instance
// src/api/axiosClient.js
import axios from "axios";
// import { config } from "@/config/env";
// import { store } from "@/store/store";
// import { clearUser } from "@/features/auth/store/authSlice";
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const axiosClient = axios.create({
  // baseURL: config.apiUrl,
  baseURL: "",
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
    const retryRequest = () => axiosClient(original);
    // Try refresh once on 401
    const shouldRefresh: boolean =
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes("/login") &&
      !original.url?.includes("/refresh-token");
    if (shouldRefresh) {
      original._retry = true;
      // !original.url?.includes("/account/me") && // prevent cycle of refreshing

      // 🔒 If refresh already running → wait
      if (isRefreshing && refreshPromise) {
        // coming requests will wait until refreshPromise resolves, then retry original request
        // req b and c waits until req a finishes then they will retry with the new token
        // store callback fun in microtask queue for req b,c to retry after refresh completes
        return refreshPromise.then(retryRequest).catch(() => {
          return Promise.reject(error);
        });
      }
      isRefreshing = true;
      // req a
      refreshPromise = axiosClient
        .post("/account/refresh-token")
        .then(() => {
          isRefreshing = false;
          refreshPromise = null;
        })
        .catch(() => {
          isRefreshing = false;
          refreshPromise = null;
          // store.dispatch(clearUser());
          return Promise.reject(error);
        });

      return refreshPromise
        .then(retryRequest)
        .catch(() => Promise.reject(error));
    }
    if (!error.response) {
      error.message = "Server is unreachable. Please try again later.";
    }
    return Promise.reject(error);
  },
);
export default axiosClient;
