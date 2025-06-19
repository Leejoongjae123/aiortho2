'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, Search } from 'lucide-react';
import MedicalInstitutionSearch from './MedicalInstitutionSearch';
import Pagination from './Pagination';

// Mock data for medical institutions
const MOCK_INSTITUTIONS = [
  { id: 1, name: '기타 (직접입력)', location: '-' },
  { id: 2, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 3, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 4, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 5, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 6, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 7, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 8, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 9, name: '강남고려병원', location: '서울 관악구 관악로242' },
  { id: 10, name: '강남고려병원', location: '서울 관악구 관악로242' },
  {
    id: 11,
    name: '강남고려병원',
    location: '서울 관악구 관악로 242 강남고려병원',
  },
  { id: 12, name: '강남차병원', location: '서울 강남구 논현로 566 강남차병원' },
  {
    id: 13,
    name: '강남세브란스병원',
    location: '서울 강남구 언주로 211 강남세브란스병원',
  },
];

interface MedicalInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (institution: { id: number; name: string; location: string }) => void;
}

const MedicalInstitutionModal: React.FC<MedicalInstitutionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('강남');
  const [filteredInstitutions, setFilteredInstitutions] = useState(MOCK_INSTITUTIONS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (searchQuery) {
      const filtered = MOCK_INSTITUTIONS.filter(
        institution =>
          institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          institution.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInstitutions(filtered);
      setCurrentPage(1);
    } else {
      setFilteredInstitutions(MOCK_INSTITUTIONS);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSelectInstitution = (institution: { id: number; name: string; location: string }) => {
    onSelect(institution);
    onClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInstitutions = filteredInstitutions.slice(startIndex, endIndex);

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className="medical-institution-modal max-w-[604px] w-[95vw] sm:w-full p-0 rounded-[24px] border-none max-h-[90vh] 
                   data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300
                   data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200
                   data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        onPointerDownOutside={e => e.preventDefault()}
        onEscapeKeyDown={onClose}
      >
        <DialogTitle className="sr-only">의료 기관 선택</DialogTitle>

        <div
          className="modal-container w-full max-h-[636px] rounded-[24px] bg-white relative 
                        font-['Pretendard_Variable',-apple-system,Roboto,Helvetica,sans-serif] 
                        flex flex-col overflow-hidden shadow-lg"
        >
          {/* Header Section */}
          <div className="modal-header flex-shrink-0 px-6 sm:px-8 pt-8 sm:pt-12 pb-4 sm:pb-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-3 sm:gap-5 flex-1">
                <h2 className="modal-title text-[#161621] text-xl sm:text-2xl font-bold leading-[140%]">
                  의료 기관명을 선택해주세요
                </h2>
                <p className="modal-subtitle text-[#66798D] text-sm sm:text-base font-normal leading-[22px]">
                  검색 결과가 없을 경우 '기타'를 선택해주세요.
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
          <div className="search-section flex-shrink-0 px-6 sm:px-8 pb-4 sm:pb-6">
            <div className="flex flex-col gap-4 sm:gap-6">
              <MedicalInstitutionSearch
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
                    {filteredInstitutions.length}
                  </span>
                  <span className="text-[#161621] text-base sm:text-lg font-bold leading-5">
                    건
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-section flex-1 flex flex-col px-6 sm:px-8 min-h-0">
            {/* Table Header */}
            <div className="table-header flex-shrink-0 flex h-12 items-center rounded-xl bg-[rgba(241,244,249,0.50)]">
              <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                  의료 기관명
                </div>
              </div>
              <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                  소재지
                </div>
              </div>
            </div>

            {/* Table Content with Scroll */}
            <div
              className="institutions-list flex-1 flex flex-col items-start overflow-y-auto min-h-0 
                           scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {currentInstitutions.length > 0 ? (
                currentInstitutions.map((institution, index) => (
                  <div
                    key={institution.id}
                    className="institution-row flex flex-col items-start w-full cursor-pointer 
                              hover:bg-blue-50 active:bg-blue-100 transition-colors duration-150"
                    onClick={() => handleSelectInstitution(institution)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectInstitution(institution);
                      }
                    }}
                  >
                    <div className="flex h-[68px] items-center w-full">
                      <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                        <div
                          className="w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                       text-[#161621] text-sm font-normal opacity-80"
                          title={institution.name}
                        >
                          {institution.name}
                        </div>
                      </div>
                      <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                        <div
                          className="w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                       text-[#161621] text-sm font-normal opacity-80"
                          title={institution.location}
                        >
                          {institution.location}
                        </div>
                      </div>
                    </div>
                    {index < currentInstitutions.length - 1 && (
                      <div className="divider w-full h-[1px] bg-[#8395AC] opacity-20"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Search className="w-12 h-12 text-gray-300" />
                    <div className="text-[#66798D] text-sm">검색 결과가 없습니다.</div>
                    <div className="text-[#66798D] text-xs">
                      다른 검색어를 입력하거나 '기타'를 선택해주세요.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <div
              className="pagination-section flex-shrink-0 flex justify-start py-4 sm:py-6 px-6 sm:px-8 
                           border-t border-gray-100"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalInstitutionModal;
