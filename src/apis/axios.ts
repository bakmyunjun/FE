import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { refreshToken } from './auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { tokens } = useAuthStore.getState();

    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // 이미 재시도한 요청이면 그대로 실패 처리
    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    const { user, tokens, login, logout } = useAuthStore.getState();

    if (!tokens?.refreshToken) {
      logout();
      return Promise.reject(error);
    }

    try {
      const { data } = await refreshToken(tokens.refreshToken);
      const newAccessToken = data.data.accessToken;

      login({
        user: user!,
        tokens: {
          accessToken: newAccessToken,
          refreshToken: tokens.refreshToken,
        },
      });

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (error) {
      logout();
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
