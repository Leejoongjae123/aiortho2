'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebarStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Navbar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const pathname = usePathname();

  // auth 페이지인지 확인 (doctor 또는 nurse)
  const isAuthPage = pathname.startsWith('/doctor/auth') || pathname.startsWith('/nurse/auth');

  // 현재 사용자 타입 확인
  const isNurse = pathname.startsWith('/nurse');
  const isDoctor = pathname.startsWith('/doctor');

  return (
    <div className="w-full h-[72px] bg-white border-b border-[var(--aiortho-gray-100)]">
      <div className="w-full h-full flex items-center justify-between px-4 md:px-7">
        {/* 왼쪽: 햄버거 메뉴 + 로고 */}
        <div className="flex items-center gap-2">
          {/* 모바일 햄버거 메뉴 - auth 페이지에서는 숨김 */}
          {!isAuthPage && (
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="메뉴 토글"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    isOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          )}

          {/* 로고 */}
          <Link href="/">
            <div className="text-[#0054A6] font-bold text-[22px] leading-6 sm:text-[20px]">
              AIOrtho
            </div>
          </Link>
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex w-10 h-10 p-1 justify-center items-center text-[#465463] rounded-full font-medium text-sm hover:bg-[#004385]/10 transition-colors">
                MY
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="end" alignOffset={0}>
              <div className="grid gap-4 p-4">
                <div className="font-medium">{isNurse ? '박간호사 님' : '박의사 님'}</div>
                <div className="text-sm text-muted-foreground">
                  {isNurse ? '간호사 코드 (UH2406001)' : '의사 코드 (UH2406001)'}
                </div>
                <hr className="my-2" />
                <Link
                  href={isNurse ? '/nurse/mypage/check' : '/doctor/mypage/check'}
                  className="text-sm hover:bg-accent hover:text-accent-foreground rounded p-2 -mx-2"
                >
                  프로필 설정
                </Link>
                <button
                  className="text-sm text-red-500 hover:bg-red-50 text-left rounded p-2 -mx-2"
                  onClick={() => {
                    // 로그아웃 로직 추가
                  }}
                >
                  로그아웃
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
