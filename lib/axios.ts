import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// 요청 시 Authorization 헤더 자동 부착
apiClient.interceptors.request.use(
  config => {
    const { accessToken } = useAuthStore.getState();

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
    const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

    console.log('request', originalRequest);

    // 응답 에러 처리 (401)
    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      // _retry: 같은 요청 반복 방지
      originalRequest._retry = true;

      try {
        console.log(1);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            refreshToken,
          })
          .then(res => res.data.data);
        console.log(2);

        // 새로운 토큰 저장
        setTokens(newAccessToken, newRefreshToken);

        // 원래 요청에 새 토큰 넣어서 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log(3);
        // Refresh 실패 → 로그아웃 처리
        clearTokens();

        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }

        return Promise.reject(refreshError);
      }
    }

    console.log(4);

    return Promise.reject(error);
  }
);

export default apiClient;
