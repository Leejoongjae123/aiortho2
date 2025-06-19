import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-[#f3f6fb] min-h-[240px] w-full shrink-0 flex">
      <div className="w-[95%] md:w-[70%] mx-auto flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-20 py-8 md:py-0">
        <div className="space-y-2">
          <h1 className="text-sm font-semibold text-[color:var(--aiortho-gray-500)]">
            고객 문의센터
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              전화번호 : 02-000-000
            </p>
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              운영시간 : 평일 08:00 - 19:00 (주말,공휴일 휴무)
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm font-semibold text-[color:var(--aiortho-gray-500)]">
            서비스 기본약관
          </h1>
          <div className="flex flex-col gap-1">
            <Link href="/doctor/auth/join-membership/service" target="_blank">
              <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
                서비스 이용약관
              </p>
            </Link>
            <Link href="/doctor/auth/join-membership/agree" target="_blank">
              <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
                개인정보 처리방침
              </p>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-sm font-semibold text-[color:var(--aiortho-gray-500)]">
            Copyright © AIOrtho. All Rights Reserved.
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              사업자등록번호 120-00-00000 | 대표 홍길동
            </p>
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              서울시 서초구 효령로 30
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
