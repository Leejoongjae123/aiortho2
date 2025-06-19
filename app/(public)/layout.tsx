import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react';

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default PublicLayout;
