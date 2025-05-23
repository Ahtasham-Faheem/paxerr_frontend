import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration & auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await axios.post("http://74.208.7.19:8040/api/token/refresh", {
          refresh: refreshToken,
        });

        localStorage.setItem("token", res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return api(originalRequest); // retry original request
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        // Clear tokens if refresh fails
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/signin"; // force logout
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
