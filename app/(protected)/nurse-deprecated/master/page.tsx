'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import DoctorTable from './components/DoctorTable';
import Pagination from './components/Pagination';
import IssueCodeModal from './components/IssueCodeModal';

const DoctorMasterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isIssueCodeModalOpen, setIsIssueCodeModalOpen] = useState(false);

  // Mock data for doctors
  const doctors = [
    {
      id: '최고관리자',
      code: '00000000',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: true,
    },
    {
      id: '12451278',
      code: 'MKD2871',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: false,
    },
    {
      id: '12451276',
      code: 'MKD2871',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: false,
    },
    {
      id: '12451275',
      code: 'MKD2871',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: false,
    },
    {
      id: '12451275',
      code: 'MKD2871',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: false,
    },
    {
      id: '12451275',
      code: 'MKD2871',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: false,
    },
    {
      id: '12451275',
      code: 'MKD2871',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: false,
    },
    {
      id: '12451275',
      code: 'MKD2871',
      name: '박명수',
      email: 'sfaags281@gmail.com',
      date: '2025.01.30 (화)',
      isAdmin: false,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleIssueCode = () => {
    setIsIssueCodeModalOpen(true);
  };

  return (
    <div className="bg-[#F5F9FF] flex pb-[79px] flex-col overflow-hidden items-stretch">
      <div className="w-full flex px-8 flex-col items-stretch md:px-8 md:mt-8">
        <div className="flex w-full items-stretch gap-5 font-pretendard flex-wrap justify-between">
          <div className="flex mt-auto mb-auto items-center gap-4 justify-start">
            <div className="text-[#161621] text-[32px] font-bold leading-none">의사 관리</div>
            <div className="text-[#66798D] text-[22px] font-medium leading-none">
              (최근 3개월 기준)
            </div>
          </div>
          <button
            onClick={handleIssueCode}
            className="self-stretch rounded-[14px] min-h-[48px] px-5 py-3 text-sm text-white font-bold bg-[#0054A6]"
          >
            가입 코드 발급
          </button>
        </div>

        <div className="rounded-[14px] bg-white shadow-[6px_6px_54px_rgba(0,0,0,0.05)] relative mt-5 p-9">
          <div className="z-0 flex w-full flex-col items-stretch justify-start">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <div className="text-[#161621]">가입 내역</div>
                <div className="flex items-center">
                  <div className="text-[#0054A6]">874</div>
                  <div className="text-[#161621]">건</div>
                </div>
              </div>

              <div className="h-10 ">
                <div className="rounded-[19px] bg-[#F0F3FA] flex w-full px-3 py-[10px] items-center">
                  <div className="flex items-center gap-2 w-full">
                    <Search className="w-5 h-5 text-[#8395AC]" />
                    <input
                      type="text"
                      placeholder="의사명 검색"
                      value={searchTerm}
                      onChange={handleSearch}
                      className="bg-transparent border-none outline-none text-[#8395AC] placeholder-[#8395AC] w-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DoctorTable doctors={doctors} />
          </div>
        </div>

        <Pagination totalPages={197} currentPage={1} />
      </div>

      {/* Issue Registration Code Modal */}
      <IssueCodeModal
        isOpen={isIssueCodeModalOpen}
        onClose={() => setIsIssueCodeModalOpen(false)}
      />
    </div>
  );
};

export default DoctorMasterPage;
