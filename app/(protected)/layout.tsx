'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { decodeJWT } from '@/lib/utils';
import { REFRESH_KEY, TOKEN_KEY } from '@/constants/auth';

const ProtectedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const router = useRouter();
  const { setAuth, setTokens } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
    const refreshToken = sessionStorage.getItem(REFRESH_KEY) || localStorage.getItem(REFRESH_KEY);

    if (!accessToken || !refreshToken) {
      router.replace('/');
      return;
    }

    setAuth(decodeJWT(accessToken));
    setTokens(accessToken, refreshToken);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      {children}
    </main>
  );
};

export default ProtectedLayout;
