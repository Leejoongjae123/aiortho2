'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/app/(public)/nurse/components/sidebar/index';

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const pathname = usePathname();
  const shouldShowSidebar = !pathname.includes('/doctor/auth') && !pathname.includes('/nurse/auth');

  // 배경색이 white인 경로들 리스트
  const whiteBackgroundRoutes = [
    '/nurse/patient/register',
    '/nurse/mypage',
    '/nurse/program',
    '/nurse/patient/status',
    '/nurse/quick',
  ];

  // 현재 pathname이 white 배경을 사용해야 하는지 확인
  const shouldUseWhiteBackground = whiteBackgroundRoutes.some(route => pathname.startsWith(route));

  return (
    <div className="flex min-h-screen">
      {/* 데스크톱 사이드바 */}
      {shouldShowSidebar && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}

      {/* 모바일 사이드바 (오버레이) */}
      {shouldShowSidebar && (
        <div className="md:hidden">
          <Sidebar />
        </div>
      )}

      <div
        className={`flex flex-col w-full ${shouldUseWhiteBackground ? 'bg-white' : 'bg-[#F5F9FF]'}`}
      >
        {/* 모바일 헤더 */}

        {/* 데스크톱 브레드크럼 */}
        {shouldShowSidebar && (
          <div className="px-4 md:px-8 w-full h-12 flex items-center text-[#66798D] flex justify-start   ">
            여기여기 {'>'} 거기거기
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
