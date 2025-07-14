'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { decodeJWT } from '@/lib/utils';
import { REFRESH_KEY, TOKEN_KEY } from '@/constants/auth';
import { getStorage } from '@/lib/storage';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import Breadcrumb from '@/components/Breadcrumb';
import { ROUTES } from '@/constants/routes';

type PATHNAME = keyof typeof ROUTES;

const HAS_BACKGROUND_COLOR_PATHS: PATHNAME[] = ['home', 'patients'];

const getPathnameKey = (pathname: string): PATHNAME | null => {
  const routeEntry = Object.entries(ROUTES).find(([_, route]) => route.path === pathname);
  return routeEntry ? (routeEntry[0] as PATHNAME) : null;
};

const ProtectedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setAuth, setTokens } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathnameKey = getPathnameKey(pathname);
  const hasBackgroundColor = pathnameKey ? HAS_BACKGROUND_COLOR_PATHS.includes(pathnameKey) : false;

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
    <main
      className={cn(
        'min-h-screen flex flex-col overflow-x-hidden',
        hasBackgroundColor && 'bg-[#F5F9FF]'
      )}
    >
      <Navbar />

      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="md:hidden">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full px-7 md:px-8">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </main>
  );
};

export default ProtectedLayout;
