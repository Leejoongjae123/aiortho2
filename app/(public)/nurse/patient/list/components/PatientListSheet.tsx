'use client';
import React from 'react';
import PatientListTitle from './PatientListTitle';
import UpdatedPatientList from './UpdatedPatientList';
import PatientListSearch from './PatientListSearch';
import { PatientListSheetProps } from '../types';

export default function PatientListSheet({
  showOnlyMyPatients,
  setShowOnlyMyPatients,
  searchQuery,
  setSearchQuery,
}: PatientListSheetProps) {
  return (
    <section className="flex relative flex-col items-start px-8 py-9 bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] max-md:px-5 w-full">
      {/* PC 레이아웃 */}
      <div className="hidden md:flex z-0 flex-col w-full">
        <PatientListTitle title="환자 명단" count={12874} />
        <UpdatedPatientList />
      </div>

      {/* 모바일 레이아웃 */}
      <div className="flex md:hidden z-0 flex-col w-full space-y-4">
        <PatientListTitle title="환자 명단" count={12874} />

        {/* 내환자만보기 필터 - 모바일에서 세로 배치 */}
        <div className="flex gap-2 items-center text-sm font-medium leading-none text-slate-400">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={showOnlyMyPatients}
              onChange={() => setShowOnlyMyPatients(!showOnlyMyPatients)}
              id="my-patients-filter-mobile"
            />
            <label htmlFor="my-patients-filter-mobile" className="cursor-pointer">
              <div
                className={`w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-200 ${
                  showOnlyMyPatients
                    ? 'bg-[#0054A6] border border-[#0054A6]'
                    : 'bg-white border border-[#8395AC] hover:border-[#6B7280]'
                }`}
              >
                {showOnlyMyPatients && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </label>
          </div>
          <label
            htmlFor="my-patients-filter-mobile"
            className={`cursor-pointer transition-colors ${
              showOnlyMyPatients ? 'text-[#0054A6]' : 'text-[#8395AC] hover:text-[#0054A6]'
            }`}
          >
            내 환자만 보기
          </label>
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
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-400 placeholder:text-slate-400 focus:text-[#161621]"
                aria-label="환자 검색"
              />
            </div>
          </div>
        </div>

        {/* 테이블 스크롤 컨테이너 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1080px]">
            <UpdatedPatientList />
          </div>
        </div>
      </div>

      {/* PC용 SearchSection - 절대 위치 */}
      <div className="hidden md:block">
        <PatientListSearch
          showOnlyMyPatients={showOnlyMyPatients}
          setShowOnlyMyPatients={setShowOnlyMyPatients}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </section>
  );
}
