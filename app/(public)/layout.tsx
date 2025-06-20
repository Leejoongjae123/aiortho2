'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { TOKEN_KEY } from '@/constants/auth';
import { decodeJWT } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

    if (accessToken) {
      setAuth(decodeJWT(accessToken));
      router.replace('/home');
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {children}
      <Footer />
    </main>
  );
};

export default PublicLayout;
