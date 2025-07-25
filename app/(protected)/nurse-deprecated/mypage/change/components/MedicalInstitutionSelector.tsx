'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import MedicalInstitutionModal from './MedicalInstitutionModal';

interface MedicalInstitutionSelectorProps {
  label: string;
  cta: string;
  required?: boolean;
  onChange?: (institution: { id: number; name: string; location: string } | null) => void;
}

const MedicalInstitutionSelector: React.FC<MedicalInstitutionSelectorProps> = ({
  label,
  cta,
  required = false,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<{
    id: number;
    name: string;
    location: string;
  } | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectInstitution = (institution: { id: number; name: string; location: string }) => {
    setSelectedInstitution(institution);
    if (onChange) {
      onChange(institution);
    }
  };

  return (
    <div className="institution-selector w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-[#8395AC]">
          {label}
          {required && <span className="text-[#0054A6]"> *</span>}
        </label>
      </div>

      {/* 의료기관명 검색 버튼 */}
      <button
        onClick={handleOpenModal}
        className="flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl bg-white border border-[#DADFE9] cursor-pointer hover:border-[#0054A6] transition-colors mb-3"
      >
        <Search className="w-5 h-5 text-[#0054A6] font-bold" />
        <span className="text-base text-[#0054A6] font-bold">의료기관명 검색</span>
      </button>

      {/* 선택된 의료기관 표시 input */}
      <div className="flex h-12 px-4 py-3.5 items-center self-stretch rounded-xl border border-[#DADFE9] bg-[#F8F9FA]">
        <div className="text-base font-normal leading-none w-full">
          {selectedInstitution ? (
            <span className="text-[#161621]">{selectedInstitution.name}</span>
          ) : (
            <span className="text-[#8395AC]">선택된 의료기관이 없습니다</span>
          )}
        </div>
      </div>

      {selectedInstitution && selectedInstitution.location !== '-' && (
        <div className="mt-2 text-sm text-[#66798D]">{selectedInstitution.location}</div>
      )}

      <MedicalInstitutionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectInstitution}
      />
    </div>
  );
};

export default MedicalInstitutionSelector;
