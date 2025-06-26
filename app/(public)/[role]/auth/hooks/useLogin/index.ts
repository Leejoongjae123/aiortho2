import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/admin/common';
import { decodeJWT } from '@/lib/utils';
import { TOKEN_KEY, REFRESH_KEY } from '@/constants/auth';
import { removeStorage, setStorage } from '@/lib/storage';

export const useLogin = (isAutoLogin: boolean) => {
  const { setAuth, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, refreshToken }) => {
      const payload = decodeJWT(accessToken);

      setAuth(payload);
      setTokens(accessToken, refreshToken);

      const storage = isAutoLogin ? 'local' : 'session';
      const altStorage = isAutoLogin ? 'session' : 'local';

      setStorage(storage, TOKEN_KEY, accessToken);
      setStorage(storage, REFRESH_KEY, refreshToken);

      removeStorage(altStorage, TOKEN_KEY);
      removeStorage(altStorage, REFRESH_KEY);
    },
  });
};
