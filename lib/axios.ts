'use client';

import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { getStorage, removeStorage, setStorage } from './storage';
import { REFRESH_KEY, TOKEN_KEY } from '@/constants/auth';
import { decodeJWT } from './utils';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// 요청 시 Authorization 헤더 자동 부착
apiClient.interceptors.request.use(
  config => {
    const accessToken = getStorage('local', TOKEN_KEY) || getStorage('session', TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response.data.data,
  async error => {
    const originalRequest = error.config;

    const storage =
      localStorage.getItem(TOKEN_KEY) && localStorage.getItem(REFRESH_KEY) ? 'local' : 'session';

    const accessToken = getStorage(storage, TOKEN_KEY);
    const refreshToken = getStorage(storage, REFRESH_KEY);

    const { setAuth, setTokens, clearTokens } = useAuthStore.getState();

    // 응답 에러 처리 (401)
    if (error.response?.status === 401 && accessToken && refreshToken && !originalRequest._retry) {
      // _retry: 같은 요청 반복 방지
      originalRequest._retry = true;

      try {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/ums/common/refresh`, {
            refreshToken,
          })
          .then(res => res.data.data);

        setStorage(storage, TOKEN_KEY, newAccessToken);
        setStorage(storage, REFRESH_KEY, newRefreshToken);

        setAuth(decodeJWT(newAccessToken));
        setTokens(newAccessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh 실패 → 로그아웃 처리

        removeStorage(storage, TOKEN_KEY);
        removeStorage(storage, REFRESH_KEY);

        clearTokens();

        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response.data.error);
  }
);

export default apiClient;
