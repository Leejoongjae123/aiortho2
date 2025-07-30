'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import PatientTable from '@/components/PatientDashboard/PatientTable';

export default function QuickMenuPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSearch = () => {
    const value = inputRef.current?.value || '';
    setSearchKeyword(value);
    setIsSearch(true);
  };

  return (
    <section className="flex flex-col">
      <h1 className="text-3xl font-bold text-[var(--aiortho-gray-900)] mb-5">처방할 환자 검색</h1>
      <h2 className="text-[var(--aiortho-gray-600)]">처방할 환자명을 입력해주세요. </h2>

      {/* 검색 폼 */}
      <div className="flex flex-col items-start gap-3 w-full my-7">
        <div className="flex flex-col items-start gap-2 w-full">
          {/* PC 레이아웃 - 가로 배치 */}
          <div className="flex flex-wrap items-center gap-4 w-full">
            <div className="flex h-12 py-[14px] px-4 items-center gap-3 flex-1 rounded-xl border border-[#DADFE9] focus-within:border-[#0054A6] focus-within:border-2 focus-within:bg-white transition-colors">
              <input
                ref={inputRef}
                type="text"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                placeholder="환자명을 입력하세요"
                className="text-[#161621] flex-1 bg-transparent border-none outline-none placeholder:text-[#97A8C3]"
              />
            </div>

            <Button
              type="button"
              onClick={handleSearch}
              className="flex w-full md:w-[108px] h-12 py-[14px] px-6 justify-center items-center gap-[10px] 
                             rounded-xl bg-[#0054A6] hover:bg-[#0054A6]/90 border-none"
            >
              <span className="font-['Pretendard',sans-serif] font-bold text-sm text-white leading-6">
                환자 검색
              </span>
            </Button>
          </div>
        </div>
      </div>

      {isSearch && searchKeyword && (
        <PatientTable
          keyword={searchKeyword}
          showMyPatientFilter={false}
          showSearchBar={false}
          clickMode="prescribe"
        />
      )}
    </section>
  );
}
