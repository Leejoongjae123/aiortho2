'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { PatientListSearchProps } from '../types';

export default function PatientListSearch({
  showOnlyMyPatients,
  setShowOnlyMyPatients,
  searchQuery,
  setSearchQuery,
}: PatientListSearchProps) {
  return (
    <>
      {/* Search Bar */}
      <div className="flex absolute top-8 right-8 z-0 flex-col max-w-full h-10 text-sm whitespace-nowrap rounded-none text-slate-400 w-[272px]">
        <div className="flex flex-col justify-center px-3 py-2.5 w-full rounded-2xl bg-slate-100 fill-slate-100 border border-transparent focus-within:border-[#0054A6] focus-within:border-2 focus-within:bg-white transition-colors">
          <div className="flex gap-2 items-center">
            <Search className="w-5 h-5 text-slate-400" />
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

      {/* Filter Option */}
      <div className="flex absolute z-0 gap-2 items-center text-sm font-medium leading-none left-[199px] text-slate-400 top-[38px]">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={showOnlyMyPatients}
            onChange={() => setShowOnlyMyPatients(!showOnlyMyPatients)}
            id="my-patients-filter-pc"
          />
          <label htmlFor="my-patients-filter-pc" className="cursor-pointer">
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
          htmlFor="my-patients-filter-pc"
          className={`cursor-pointer transition-colors ${
            showOnlyMyPatients ? 'text-[#0054A6]' : 'text-[#8395AC] hover:text-[#0054A6]'
          }`}
        >
          내 환자만 보기
        </label>
      </div>
    </>
  );
}
