'use client';

import React, { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';
import NurseSearchModal from './NurseSearchModal';
import { Nurse } from '../types/nurse';

interface NurseManagerProps {
  label: string;
  cta: string;
  required?: boolean;
  onChange?: (nurses: Nurse[]) => void;
}

const NurseManager: React.FC<NurseManagerProps> = ({ label, cta, required = false, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNurses, setSelectedNurses] = useState<Nurse[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectNurse = (nurse: Nurse) => {
    // 이미 선택된 간호사인지 확인
    const isAlreadySelected = selectedNurses.some(selectedNurse => selectedNurse.id === nurse.id);

    if (!isAlreadySelected) {
      const updatedNurses = [...selectedNurses, nurse];
      setSelectedNurses(updatedNurses);
      if (onChange) {
        onChange(updatedNurses);
      }
    }
  };

  const handleRemoveNurse = (nurseId: number) => {
    const updatedNurses = selectedNurses.filter(nurse => nurse.id !== nurseId);
    setSelectedNurses(updatedNurses);
    if (onChange) {
      onChange(updatedNurses);
    }
  };

  return (
    <div className="nurse-manager w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-[#8395AC]">{label}</label>
      </div>

      {/* 담당 간호사 추가 버튼 */}
      <button
        onClick={handleOpenModal}
        className="flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl bg-white border border-[#DADFE9] cursor-pointer hover:border-[#0054A6] transition-colors mb-3"
      >
        <Plus className="w-5 h-5 text-[#0054A6] font-bold" />
        <span className="text-base text-[#0054A6] font-bold">{cta}</span>
      </button>

      {/* 선택된 간호사들 표시 */}
      <div className="space-y-2">
        {selectedNurses.length === 0 ? (
          <div className="flex h-12 px-4 py-3.5 items-center self-stretch rounded-xl border border-[#DADFE9] bg-[#F8F9FA]">
            <span className="text-[#8395AC] text-base font-normal">담당 간호사를 추가해주세요</span>
          </div>
        ) : (
          selectedNurses.map(nurse => (
            <div className="flex items-center gap-2 w-full">
              <div
                key={nurse.id}
                className="flex h-12 px-4 py-3.5 items-center justify-between self-stretch rounded-xl border border-[#DADFE9] bg-[#F0F3FA]/60 w-full"
              >
                <div className="flex items-center gap-2">
                  <div className="text-[#66798D] text-base font-medium">{nurse.name}</div>
                </div>
                <div className="flex items-center"></div>
              </div>
              <button
                onClick={() => handleRemoveNurse(nurse.id)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F0F3FA]/60 "
              >
                <X className="w-4 h-4 text-[#8395AC]" />
              </button>
            </div>
          ))
        )}
      </div>

      <NurseSearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectNurse}
        selectedNurses={selectedNurses}
      />
    </div>
  );
};

export default NurseManager;
