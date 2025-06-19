'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import UpdatedQuickPatientList from './components/UpdatedQuickPatientList';
import Pagination from './components/Pagination';

export default function QuickPage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!patientName.trim()) {
      setError('환자명을 입력해주세요.');
      return;
    }

    // Clear any existing errors
    setError('');

    // Here you would typically search for the patient
    // For now, just simulate an error for demonstration
    setError('올바른 생년월일 형식이 아니에요.');

    // Navigate to patient status or results page
    // router.push(`/doctor/patient/status?search=${encodeURIComponent(patientName)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientName(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-full flex flex-col justify-start items-center px-4 py-4 md:py-13">
        <div className="w-full flex flex-col items-center">
          {/* 제목 */}
          <div className="w-full">
            <div className="font-['Pretendard',sans-serif] font-bold text-[32px] text-[#161621] leading-10 md:text-[28px] sm:text-2xl sm:leading-8">
              처방할 환자 검색
            </div>
          </div>

          {/* 설명 */}
          <div className="w-full">
            <div className="font-['Pretendard',sans-serif] font-normal text-[17px] text-[#66798D] leading-7 sm:text-base mt-5">
              처방할 환자명을 입력해주세요.
            </div>
          </div>

          {/* 검색 폼 */}
          <div className="flex flex-col items-start gap-3 w-full mt-7">
            <div className="flex flex-col items-start gap-2 w-full">
              {/* PC 레이아웃 - 가로 배치 */}
              <div className="hidden md:flex items-center gap-4 w-full">
                <div className="flex h-12 py-[14px] px-4 items-center gap-3 flex-1 rounded-xl border border-[#DADFE9]">
                  <input
                    type="text"
                    value={patientName}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="환자명을 입력하세요"
                    className="font-['Pretendard',sans-serif] font-normal text-base text-[#161621] flex-1 bg-transparent border-none outline-none placeholder:text-[#97A8C3]"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="flex w-[108px] h-12 py-[14px] px-6 justify-center items-center gap-[10px] 
                             rounded-xl bg-[#0054A6] hover:bg-[#0054A6]/90 border-none"
                >
                  <span className="font-['Pretendard',sans-serif] font-bold text-sm text-white leading-6">
                    환자 검색
                  </span>
                </Button>
              </div>

              {/* 모바일 레이아웃 - 세로 배치 */}
              <div className="flex md:hidden flex-col gap-3 w-full">
                <div className="flex h-12 py-[14px] px-4 items-center gap-3 w-full rounded-xl border border-[#DADFE9]">
                  <input
                    type="text"
                    value={patientName}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="환자명을 입력하세요"
                    className="font-['Pretendard',sans-serif] font-normal text-base text-[#161621] flex-1 bg-transparent border-none outline-none placeholder:text-[#97A8C3]"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="flex w-full h-12 py-[14px] px-6 justify-center items-center gap-[10px] 
                             rounded-xl bg-[#0054A6] hover:bg-[#0054A6]/90 border-none"
                >
                  <span className="font-['Pretendard',sans-serif] font-bold text-sm text-white leading-6">
                    환자 검색
                  </span>
                </Button>
              </div>

              {error && (
                <div className="font-['Pretendard',sans-serif] font-normal text-sm text-[#FF0D4E] w-full leading-4">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* 테이블 섹션 */}
          <div className="w-full mt-7">
            {/* PC 레이아웃 */}
            <div className="hidden md:block w-full">
              <UpdatedQuickPatientList />
            </div>

            {/* 모바일 레이아웃 - 가로 스크롤 */}
            <div className="block md:hidden w-full">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1080px]">
                  <UpdatedQuickPatientList />
                </div>
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className="w-full mt-4">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
