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

// 배경색이 필요한 경로들 (key 기준)
const HAS_BACKGROUND_COLOR_PATHS = ['home', 'patients', 'admin'];

// pathname을 ROUTES key로 변환하는 함수
const getPathnameKey = (pathname: string): string | null => {
  // ROUTES에서 해당 경로를 찾아 key 반환
  const findKey = (routes: typeof ROUTES, targetPath: string): string | null => {
    for (const [routeKey, route] of Object.entries(routes)) {
      if (route.path === targetPath) {
        return route.key; // route.key 반환
      }
      if (route.children) {
        const found = findKey(route.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  return findKey(ROUTES, pathname);
};

const ProtectedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setAuth, setTokens } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // 타입 안전한 방식으로 pathname 처리
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

      <div className="flex min-h-[calc(100vh-72px)]">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="md:hidden">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full px-7 pb-7 md:pb-8 md:px-8">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </main>
  );
};

export default ProtectedLayout;
