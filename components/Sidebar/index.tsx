'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import NavItem from './NavItem';
import NavSection from './NavSection';
import SubNavItem from './SubNavItem';
import NavFooter from './NavFooter';
import { NavFooterItemProps } from './types';
import { HomeIcon, PrescriptionIcon, MyPageIcon, DoctorsIcon } from './icons';
import { useSidebarStore } from '@/store/sidebarStore';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  // 현재 경로가 해당 메뉴와 일치하는지 확인하는 함수
  const isActivePath = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  // // 현재 경로가 해당 섹션의 하위 경로인지 확인하는 함수
  const isActiveSection = (sectionPath: string) => {
    return pathname.startsWith(sectionPath);
  };

  // 모바일에서 사이드바 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
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
        id="sidebar"
        className={cn(
          'flex flex-col w-60 bg-white md:relative md:translate-x-0 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out md:border-r border-[var(--aiortho-gray-100)]',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
        aria-label="Main Navigation"
      >
        <div className="flex flex-col items-start h-full">
          {/* 헤더 */}
          <div className="flex items-center gap-2 justify-center py-4 px-4 md:hidden">
            <Link href="/">
              <div className="text-[#0054A6] font-bold text-[22px] leading-6 sm:text-[20px]">
                AIOrtho
              </div>
            </Link>
          </div>

          {/* 메인 네비게이션 */}
          <div className="flex-1 pt-2">
            <ul className="w-full flex flex-col gap-2">
              <NavItem
                icon={<HomeIcon />}
                label="홈"
                isActive={isActivePath('/home')}
                onClick={() => handleNavItemClick(() => router.push('/home'))}
              />

              <NavSection
                icon={<PrescriptionIcon />}
                label="처방 관리"
                isActive={isActiveSection('/prescriptions')}
                isExpanded={isActiveSection('/prescriptions')}
                onToggle={handleDropdownToggle}
              >
                <SubNavItem
                  label="환자 명단"
                  isActive={isActivePath('/prescriptions/patients')}
                  onClick={() => handleNavItemClick(() => router.push('/prescriptions/patients'))}
                />

                {(auth?.role === 'Doctor' || auth?.role === 'Root') && (
                  <SubNavItem
                    label="표준 치료 프로그램"
                    isActive={isActivePath('/prescriptions/standard-treatment-program')}
                    onClick={() =>
                      handleNavItemClick(() =>
                        router.push('/prescriptions/standard-treatment-program')
                      )
                    }
                  />
                )}
              </NavSection>

              {auth?.role === 'Root' && (
                <NavItem
                  icon={<DoctorsIcon />}
                  label="의사 관리"
                  isActive={isActivePath('/admin')}
                  onClick={() => handleNavItemClick(() => router.push('/admin'))}
                />
              )}

              <NavSection
                icon={<MyPageIcon />}
                label="마이페이지"
                isExpanded={isActiveSection('/profile')}
                onToggle={handleDropdownToggle}
              >
                <SubNavItem
                  label="개인정보 수정"
                  isActive={isActivePath('/profile/edit')}
                  onClick={() => handleNavItemClick(() => router.push('/profile/edit'))}
                />
              </NavSection>
            </ul>
          </div>

          {/* 푸터 */}
          <div className="px-6 pb-6">
            <NavFooter items={footerItems} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
