'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSidebarStore } from '@/store/sidebarStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuthStore } from '@/store/authStore';
import { isDoctorRole } from '@/lib/utils';
import { useDoctorProfile } from '@/hooks/useDoctorProfile';
import { useNurseProfile } from '@/hooks/useNurseProfile';
import { removeStorage } from '@/lib/storage';
import { REFRESH_KEY, TOKEN_KEY } from '@/constants/auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { auth, clearAuth, clearTokens } = useAuthStore();
  const { isOpen, toggleSidebar } = useSidebarStore();
  const [open, setOpen] = useState(false);

  const doctorProfileQuery = useDoctorProfile({
    enabled: !!auth && isDoctorRole(auth.role),
  });
  const nurseProfileQuery = useNurseProfile({
    enabled: !!auth && !isDoctorRole(auth.role),
  });

  const profileQuery = auth
    ? isDoctorRole(auth.role)
      ? doctorProfileQuery
      : nurseProfileQuery
    : null;

  const { data: profile } = profileQuery ?? {};

  const handleLogout = () => {
    removeStorage('local', TOKEN_KEY);
    removeStorage('local', REFRESH_KEY);
    removeStorage('session', TOKEN_KEY);
    removeStorage('session', REFRESH_KEY);
    clearAuth();
    clearTokens();

    router.replace('/');
  };

  return (
    <div className="w-full h-[72px] bg-white border-b border-[var(--aiortho-gray-100)]">
      <div className="w-full h-full flex items-center justify-between px-4 md:px-7">
        {/* 왼쪽: 햄버거 메뉴 + 로고 */}
        <div className="flex items-center gap-2">
          {/* 모바일 햄버거 메뉴 - auth 페이지에서는 숨김 */}
          {profile && (
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
        {auth && profile && (
          <div className="flex items-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="flex w-10 h-10 p-1 justify-center items-center text-[#465463] rounded-full font-medium text-sm hover:bg-[#004385]/10 transition-colors cursor-pointer">
                  MY
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="end" alignOffset={0}>
                <div className="grid gap-4 p-4">
                  <div className="font-medium">
                    {auth.role === 'Nurse' ? `${profile.name}간호사 님` : `${profile.name}의사 님`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {auth.role === 'Nurse'
                      ? `간호사 코드 (${profile.adminId})`
                      : `의사 코드 (${profile.adminId})`}
                  </div>
                  <hr className="my-2" />
                  <Link
                    href="/profile"
                    className="text-sm hover:bg-accent hover:text-accent-foreground rounded p-2 -mx-2"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    프로필 설정
                  </Link>
                  <button
                    className="text-sm text-red-500 hover:bg-red-50 text-left rounded p-2 -mx-2 cursor-pointer"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
