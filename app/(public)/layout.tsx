import { ReactNode } from 'react';
import Footer from '@/components/Footer';

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {children}
      <Footer />
    </main>
  );
};

export default PublicLayout;
