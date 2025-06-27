'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavItem from './NavItem';
import NavSection from './NavSection';
import SubNavItem from './SubNavItem';
import NavFooter from './NavFooter';
import { NavFooterItemProps } from './types';
import { homeIcon, prescriptionIcon, myPageIcon, DoctorsIcon } from './Icon';
import { useSidebarStore } from '@/store/sidebarStore';
import { useAuthStore } from '@/store/authStore';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { isOpen, closeSidebar } = useSidebarStore();
  const { auth } = useAuthStore();

  // Footer items
  const footerItems: NavFooterItemProps[] = [
    { label: '사용설명서', onClick: () => console.log('사용설명서 clicked') },
    {
      label: '소프트웨어 명칭 및 버전',
      onClick: () => console.log('소프트웨어 명칭 및 버전 clicked'),
    },
    {
      label: '의료기기 인증 정보',
      onClick: () => console.log('의료기기 인증 정보 clicked'),
    },
  ];

  const handleNavItemClick = (callback: () => void) => {
    callback();
    // 모바일에서 네비게이션 클릭 시 사이드바 닫기
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  // 드롭다운 토글 시에는 사이드바를 닫지 않는 별도 함수
  const handleDropdownToggle = () => {
    // 드롭다운 토글만 수행, 사이드바는 닫지 않음
  };

  // 모바일에서 사이드바 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const hamburger = document.querySelector('[aria-label="메뉴 토글"]');

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        hamburger &&
        !hamburger.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" />}

      {/* 사이드바 */}
      <nav
        id="mobile-sidebar"
        className={`
          flex flex-col items-start px-0 w-60 bg-white gap-[542px] 
          max-md:gap-96 max-md:px-0 max-md:pt-1.5 max-md:pb-96 
          max-sm:gap-52 max-sm:px-0 max-sm:pt-1 max-sm:pb-52
          md:relative md:translate-x-0
          fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        aria-label="Main Navigation"
      >
        <div className="flex flex-col items-start w-60">
          <div className="flex items-center gap-2 justify-center py-4 px-4 md:hidden">
            <Link href="/">
              <div className="text-[#0054A6] font-bold text-[22px] leading-6 sm:text-[20px]">
                AIOrtho
              </div>
            </Link>
          </div>
          <ul className="w-full">
            <NavItem
              icon={homeIcon}
              label="홈"
              isActive={true}
              onClick={() => handleNavItemClick(() => router.push('/doctor/home'))}
            />

            <NavSection
              icon={prescriptionIcon}
              label="처방 관리"
              isExpanded={true}
              onToggle={handleDropdownToggle}
            >
              <SubNavItem
                label="환자 명단"
                onClick={() => handleNavItemClick(() => router.push('/doctor/patient/list'))}
              />

              {(auth?.role === 'Doctor' || auth?.role === 'Root') && (
                <SubNavItem
                  label="표준 치료 프로그램"
                  onClick={() => handleNavItemClick(() => router.push('/doctor/program'))}
                />
              )}
            </NavSection>

            {auth?.role === 'Root' && (
              <NavItem
                icon={<DoctorsIcon />}
                label="의사 관리"
                isActive={false}
                onClick={() => handleNavItemClick(() => router.push('/doctor/master'))}
              />
            )}

            <NavSection icon={myPageIcon} label="마이페이지" onToggle={handleDropdownToggle}>
              <SubNavItem
                label="개인정보 수정"
                onClick={() => handleNavItemClick(() => router.push('/doctor/mypage/check'))}
              />
            </NavSection>
          </ul>
        </div>

        <NavFooter items={footerItems} />
      </nav>
    </>
  );
};

export default Sidebar;
