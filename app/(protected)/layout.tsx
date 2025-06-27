'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { decodeJWT } from '@/lib/utils';
import { REFRESH_KEY, TOKEN_KEY } from '@/constants/auth';
import { getStorage } from '@/lib/storage';
import Sidebar from '@/components/Sidebar';

const ProtectedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const router = useRouter();
  const { setAuth, setTokens } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = getStorage('local', TOKEN_KEY) || getStorage('session', TOKEN_KEY);
    const refreshToken = getStorage('local', REFRESH_KEY) || getStorage('session', REFRESH_KEY);

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

      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="md:hidden">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default ProtectedLayout;
