import { create } from 'zustand';

interface JWTTokenPayload {
  sub: string;
  adminId: string;
  role: string;
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
    set({
      accessToken,
      refreshToken,
    });
  },

  clearAuth: () => {
    set({ auth: null });
  },

  clearTokens: () => {
    set({
      accessToken: null,
      refreshToken: null,
    });
  },
}));
