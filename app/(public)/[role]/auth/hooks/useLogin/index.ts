import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/admin/common';
import { decodeJWT } from '@/lib/utils';
import { TOKEN_KEY, REFRESH_KEY } from '@/constants/auth';

export const useLogin = (isAutoLogin: boolean) => {
  const { setAuth, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, refreshToken }) => {
      const payload = decodeJWT(accessToken);

      setAuth(payload);
      setTokens(accessToken, refreshToken);

      const storage = isAutoLogin ? localStorage : sessionStorage;
      const altStorage = isAutoLogin ? sessionStorage : localStorage;

      storage.setItem(TOKEN_KEY, accessToken);
      storage.setItem(REFRESH_KEY, refreshToken);

      altStorage.removeItem(TOKEN_KEY);
      altStorage.removeItem(REFRESH_KEY);
    },
  });
};
