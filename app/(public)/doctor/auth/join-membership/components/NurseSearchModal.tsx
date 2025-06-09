"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Search, User } from "lucide-react";
import NurseSearch from "./NurseSearch";
import Pagination from "./Pagination";
import { Nurse } from "../types/nurse";

// Mock data for nurses
const MOCK_NURSES: Nurse[] = [
  { id: 1, name: "김미영", department: "내과", license: "간호사면허 123456", experience: "5년", phone: "010-1234-5678" },
  { id: 2, name: "박서연", department: "외과", license: "간호사면허 234567", experience: "8년", phone: "010-2345-6789" },
  { id: 3, name: "이지은", department: "정형외과", license: "간호사면허 345678", experience: "3년", phone: "010-3456-7890" },
  { id: 4, name: "최수진", department: "재활의학과", license: "간호사면허 456789", experience: "7년", phone: "010-4567-8901" },
  { id: 5, name: "정현아", department: "신경외과", license: "간호사면허 567890", experience: "4년", phone: "010-5678-9012" },
  { id: 6, name: "강은정", department: "성형외과", license: "간호사면허 678901", experience: "6년", phone: "010-6789-0123" },
  { id: 7, name: "윤소희", department: "마취과", license: "간호사면허 789012", experience: "10년", phone: "010-7890-1234" },
  { id: 8, name: "임지혜", department: "응급실", license: "간호사면허 890123", experience: "2년", phone: "010-8901-2345" },
  { id: 9, name: "조민지", department: "중환자실", license: "간호사면허 901234", experience: "9년", phone: "010-9012-3456" },
  { id: 10, name: "한수연", department: "소아과", license: "간호사면허 012345", experience: "5년", phone: "010-0123-4567" },
  { id: 11, name: "송지아", department: "산부인과", license: "간호사면허 111111", experience: "6년", phone: "010-1111-1111" },
  { id: 12, name: "김하늘", department: "안과", license: "간호사면허 222222", experience: "4년", phone: "010-2222-2222" },
  { id: 13, name: "이별님", department: "이비인후과", license: "간호사면허 333333", experience: "7년", phone: "010-3333-3333" },
  { id: 14, name: "박달님", department: "피부과", license: "간호사면허 444444", experience: "3년", phone: "010-4444-4444" },
  { id: 15, name: "최바다", department: "정신건강의학과", license: "간호사면허 555555", experience: "8년", phone: "010-5555-5555" },
  { id: 16, name: "정구름", department: "가정의학과", license: "간호사면허 666666", experience: "5년", phone: "010-6666-6666" },
  { id: 17, name: "강별빛", department: "내분비내과", license: "간호사면허 777777", experience: "9년", phone: "010-7777-7777" },
  { id: 18, name: "윤달빛", department: "심장내과", license: "간호사면허 888888", experience: "6년", phone: "010-8888-8888" },
  { id: 19, name: "임햇빛", department: "호흡기내과", license: "간호사면허 999999", experience: "4년", phone: "010-9999-9999" },
  { id: 20, name: "조무지개", department: "소화기내과", license: "간호사면허 000000", experience: "7년", phone: "010-0000-0000" },
  { id: 21, name: "한꽃님", department: "신장내과", license: "간호사면허 121212", experience: "5년", phone: "010-1212-1212" },
  { id: 22, name: "서나래", department: "혈액종양내과", license: "간호사면허 131313", experience: "8년", phone: "010-1313-1313" },
  { id: 23, name: "김솔잎", department: "감염내과", license: "간호사면허 141414", experience: "3년", phone: "010-1414-1414" },
  { id: 24, name: "이푸름", department: "류마티스내과", license: "간호사면허 151515", experience: "6년", phone: "010-1515-1515" },
  { id: 25, name: "박새롬", department: "알레르기내과", license: "간호사면허 161616", experience: "4년", phone: "010-1616-1616" },
];

interface NurseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (nurse: Nurse) => void;
  selectedNurses: Nurse[];
}

const NurseSearchModal: React.FC<NurseSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedNurses,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNurses, setFilteredNurses] = useState(MOCK_NURSES);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (searchQuery) {
      const filtered = MOCK_NURSES.filter(
        (nurse) =>
          nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nurse.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nurse.license.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nurse.phone.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNurses(filtered);
      setCurrentPage(1);
    } else {
      setFilteredNurses(MOCK_NURSES);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSelectNurse = (nurse: Nurse) => {
    onSelect(nurse);
    onClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Check if nurse is already selected
  const isNurseSelected = (nurseId: number) => {
    return selectedNurses.some((nurse) => nurse.id === nurseId);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredNurses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNurses = filteredNurses.slice(startIndex, endIndex);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="nurse-search-modal max-w-[604px] w-[95vw] sm:w-full p-0 rounded-[24px] border-none h-[70vh] max-h-[600px] min-h-[500px]
                   data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300
                   data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200
                   data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={onClose}
      >
        <DialogTitle className="sr-only">담당 간호사 선택</DialogTitle>
        
        <div className="modal-container w-full h-full rounded-[24px] bg-white relative 
                        font-['Pretendard_Variable',-apple-system,Roboto,Helvetica,sans-serif] 
                        flex flex-col overflow-hidden shadow-lg">
          
          {/* Header Section */}
          <div className="modal-header flex-shrink-0 px-6 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                <h2 className="modal-title text-[#161621] text-xl sm:text-2xl font-bold leading-[140%]">
                  담당 간호사를 선택해주세요
                </h2>
                <p className="modal-subtitle text-[#66798D] text-sm sm:text-base font-normal leading-[22px]">
                  이름, 부서, 면허번호, 휴대폰번호로 검색할 수 있습니다.
                </p>
              </div>
              <button
                onClick={onClose}
                className="close-button flex w-8 h-8 justify-center items-center rounded-full
                          hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                aria-label="모달 닫기"
              >
                <X className="w-5 h-5 text-[#66798D]" />
              </button>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section flex-shrink-0 px-6 sm:px-8 pb-3 sm:pb-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <NurseSearch
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onClear={handleClearSearch}
              />

              <div className="results-header flex items-center gap-2">
                <h3 className="text-[#161621] text-base sm:text-lg font-bold leading-5">
                  검색 결과
                </h3>
                <div className="flex items-center">
                  <span className="text-[#0054A6] text-base sm:text-lg font-bold leading-5">
                    {filteredNurses.length}
                  </span>
                  <span className="text-[#161621] text-base sm:text-lg font-bold leading-5">
                    건
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-section flex flex-col px-6 sm:px-8 flex-1 min-h-0">
            {/* Table Header */}
            <div className="table-header flex-shrink-0 flex h-12 items-center rounded-xl bg-[rgba(241,244,249,0.50)]">
              <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                  간호사명
                </div>
              </div>
              <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                  휴대폰번호
                </div>
              </div>
            </div>

            {/* Table Content with Scroll */}
            <div className="nurses-list flex-1 flex flex-col items-start overflow-y-auto min-h-[200px]
                           scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {currentNurses.length > 0 ? (
                currentNurses.map((nurse, index) => {
                  const isSelected = isNurseSelected(nurse.id);
                  return (
                    <div
                      key={nurse.id}
                      className={`nurse-row flex flex-col items-start w-full cursor-pointer 
                                transition-colors duration-150 ${
                                  isSelected 
                                    ? "bg-blue-100 hover:bg-blue-100" 
                                    : "hover:bg-blue-50 active:bg-blue-100"
                                }`}
                      onClick={() => !isSelected && handleSelectNurse(nurse)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && !isSelected) {
                          e.preventDefault();
                          handleSelectNurse(nurse);
                        }
                      }}
                    >
                      <div className="flex h-[68px] items-center w-full">
                        <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                          <div className={`w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                         text-sm font-normal ${
                                           isSelected 
                                             ? "text-[#0054A6] font-medium" 
                                             : "text-[#161621] opacity-80"
                                         }`}
                               title={nurse.name}>
                            {nurse.name}
                            {isSelected && <span className="ml-2 text-xs">(선택됨)</span>}
                          </div>
                        </div>
                        <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                          <div className={`w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                         text-sm font-normal ${
                                           isSelected 
                                             ? "text-[#0054A6]" 
                                             : "text-[#161621] opacity-80"
                                         }`}
                               title={nurse.phone}>
                            {nurse.phone}
                          </div>
                        </div>
                      </div>
                      {index < currentNurses.length - 1 && (
                        <div className="divider w-full h-[1px] bg-[#8395AC] opacity-20"></div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <User className="w-12 h-12 text-gray-300" />
                    <div className="text-[#66798D] text-sm">
                      검색 결과가 없습니다.
                    </div>
                    <div className="text-[#66798D] text-xs">
                      다른 검색어를 입력해주세요.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination Section - Always visible at bottom */}
          <div className="pagination-section flex-shrink-0 flex justify-start py-3 sm:py-4 px-6 sm:px-8 
                         border-t border-gray-100 bg-white">
            {totalPages > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : (
              <div className="h-8"></div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NurseSearchModal; 