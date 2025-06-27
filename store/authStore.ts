import { create } from 'zustand';
// import { REFRESH_KEY, TOKEN_KEY } from '@/constants/auth';
// import { setStorage, removeStorage } from '@/lib/storage';
import { UserRole } from '@/models';

interface JWTTokenPayload {
  sub: string;
  adminId: string;
  role: UserRole;
  hospitalCode: string;
  iat: number;
  exp: number;
}

interface AuthState {
  auth: JWTTokenPayload | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (auth: JWTTokenPayload) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  refreshToken: null,
  auth: null,

  setAuth: auth => {
    set({ auth });
  },

  setTokens: (accessToken, refreshToken) => {
    // FIXME: 기획 고도화 필요
    // const isLocal = localStorage.getItem(TOKEN_KEY) && localStorage.getItem(REFRESH_KEY);

    // setStorage(isLocal ? 'local' : 'session', TOKEN_KEY, accessToken);
    // setStorage(isLocal ? 'local' : 'session', REFRESH_KEY, refreshToken);

    set({
      accessToken,
      refreshToken,
    });
  },

  clearAuth: () => {
    set({ auth: null });
  },

  clearTokens: () => {
    // FIXME: 기획 고도화 필요

    // const isLocal = localStorage.getItem(TOKEN_KEY) && localStorage.getItem(REFRESH_KEY);

    // removeStorage(isLocal ? 'local' : 'session', TOKEN_KEY);
    // removeStorage(isLocal ? 'local' : 'session', REFRESH_KEY);

    set({
      accessToken: null,
      refreshToken: null,
    });
  },
}));
