'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import NurseSearchModal from './NurseSearchModal';
import { Nurse } from '@/models';
import { cn } from '@/lib/utils';

interface NurseManagerProps {
  label: string;
  error?: string;
  onChange?: (nurseIds: string[]) => void;
}

const NurseManager: React.FC<NurseManagerProps> = ({ label, error, onChange }) => {
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
    const isAlreadySelected = selectedNurses.some(
      selectedNurse => selectedNurse.adminId === nurse.adminId
    );

    if (!isAlreadySelected) {
      const updatedNurses = [...selectedNurses, nurse];
      setSelectedNurses(updatedNurses);

      if (onChange) {
        onChange(updatedNurses.map(n => n.adminId));
      }
    }
  };

  const handleRemoveNurse = (nurseId: string) => {
    const updatedNurses = selectedNurses.filter(nurse => nurse.adminId !== nurseId);
    setSelectedNurses(updatedNurses);

    if (onChange) {
      onChange(updatedNurses.map(n => n.adminId));
    }
  };

  return (
    <div className="nurse-manager w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-[var(--aiortho-gray-500)]">{label}</label>
      </div>

      {/* 담당 간호사 추가 버튼 */}
      <button
        type="button"
        onClick={handleOpenModal}
        className={cn(
          'flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl border border-[var(--aiortho-gray-200)] cursor-pointer hover:border-[var(--aiortho-primary)] transition-colors mb-3',
          error && 'border-2 border-[color:var(--aiortho-danger)]'
        )}
      >
        <Plus className="w-5 h-5 text-[var(--aiortho-primary)] font-bold" />
        <span className="text-base text-[var(--aiortho-primary)] font-bold">담당 간호사 추가</span>
      </button>

      {/* 선택된 간호사들 표시 */}
      <div className="space-y-2">
        {selectedNurses.length === 0 ? (
          <div className="flex h-12 px-4 py-3.5 items-center self-stretch rounded-xl border border-[var(--aiortho-gray-200)] bg-[#F0F3FA]/60">
            <span className="text-[var(--aiortho-gray-500)] text-base font-normal">
              담당 간호사가 없습니다
            </span>
          </div>
        ) : (
          selectedNurses.map(nurse => (
            <div key={nurse.adminId} className="flex items-center gap-2 w-full">
              <div className="flex h-12 px-4 py-3.5 items-center justify-between self-stretch rounded-xl border border-[var(--aiortho-gray-200)] bg-[#F0F3FA]/60 w-full">
                <div className="flex items-center gap-2">
                  <div className="text-[var(--aiortho-gray-600)] text-base font-medium">
                    {nurse.name}
                  </div>
                </div>
                <div className="flex items-center"></div>
              </div>
              <button
                onClick={() => handleRemoveNurse(nurse.adminId)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--aiortho-gray-100)]"
              >
                <X className="w-4 h-4 text-[var(--aiortho-gray-600)] cursor-pointer" />
              </button>
            </div>
          ))
        )}
      </div>

      {error && <p className="font-normal text-[var(--aiortho-danger)] text-xs mt-2">{error}</p>}

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
