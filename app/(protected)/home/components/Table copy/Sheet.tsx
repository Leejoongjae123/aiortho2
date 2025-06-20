'use client';
import * as React from 'react';
import TitleSection from './TitleSection';
import PatientTable from './PatientTable';
import SearchSection from './SearchSection';

function Sheet() {
  return (
    <section className="flex relative flex-col items-start px-8 py-9 bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] max-md:px-5 w-full">
      {/* PC 레이아웃 */}
      <div className="hidden md:flex z-0 flex-col w-full">
        <TitleSection title="미처방" count={2712} />
        <PatientTable />
      </div>

      {/* 모바일 레이아웃 */}
      <div className="flex md:hidden z-0 flex-col w-full space-y-4">
        <TitleSection title="미처방" count={2712} />

        {/* 내환자만보기 필터 - 모바일에서 세로 배치 */}
        <div className="flex gap-2 items-center text-sm font-medium leading-none text-slate-400">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/0aeafc554956665f06e63f1d577f6ac6e4df0b54?placeholderIfAbsent=true"
            className="object-contain shrink-0 w-4 aspect-square"
            alt="Filter icon"
          />
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="내 환자만 보기 필터 적용"
          >
            내 환자만 보기
          </button>
        </div>

        {/* 검색창 - 모바일에서 세로 배치 */}
        <div className="flex flex-col max-w-full h-10 text-sm whitespace-nowrap rounded-none text-slate-400 w-full">
          <div className="flex flex-col justify-center px-3 py-2.5 w-full rounded-2xl bg-slate-100 fill-slate-100 border border-transparent focus-within:border-[#0054A6] focus-within:border-2 focus-within:bg-white transition-colors">
            <div className="flex gap-2 items-center">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="검색"
                className="flex-1 bg-transparent border-none outline-none text-slate-400 placeholder:text-slate-400 focus:text-[#161621]"
                aria-label="환자 검색"
              />
            </div>
          </div>
        </div>

        {/* 테이블 스크롤 컨테이너 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1080px]">
            <PatientTable />
          </div>
        </div>
      </div>

      {/* PC용 SearchSection - 절대 위치 */}
      <div className="hidden md:block">
        <SearchSection />
      </div>
    </section>
  );
}

export default Sheet;
