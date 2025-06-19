import Footer from '@/components/Footer';
import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-50px)]">
      <div className="flex-1 bg-white">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
