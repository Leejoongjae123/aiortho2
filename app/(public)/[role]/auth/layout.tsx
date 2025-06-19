import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

const AuthLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;
