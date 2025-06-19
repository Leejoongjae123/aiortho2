'use client';
import * as React from 'react';
import { useState } from 'react';
import { RiExpandUpDownFill } from 'react-icons/ri';
import IssueCodeModal from './IssueCodeModal';
import {
  Doctor,
  DoctorTableProps,
  StatusBadgeProps,
  TableHeaderCellProps,
  DoctorTableRowProps,
} from './types';

// StatusBadge 컴포넌트 (관리자 여부 표시)
function StatusBadge({ isAdmin }: StatusBadgeProps) {
  if (isAdmin) {
    return (
      <div className="flex gap-1 justify-center items-center px-3 py-1 rounded-2xl bg-[#0054A6]/20 min-h-7">
        <div
          className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-[#0054A6] rounded-full"
          aria-hidden="true"
        />
        <div className="self-stretch my-auto text-[#0054A6]">관리자</div>
      </div>
    );
  }

  return (
    <div className="flex gap-1 justify-center items-center px-3 py-1 rounded-2xl bg-[#73E484]/20 min-h-7">
      <div
        className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-[#0CA147] rounded-full"
        aria-hidden="true"
      />
      <div className="self-stretch my-auto text-[#0CA147]">일반의사</div>
    </div>
  );
}

// TableHeaderCell 컴포넌트
function TableHeaderCell({ label, flex }: TableHeaderCellProps) {
  return (
    <div className={`flex justify-center items-center px-3 py-3 my-auto min-h-12 ${flex}`}>
      <h2 className="text-sm font-bold opacity-80 text-zinc-900">{label}</h2>
      <RiExpandUpDownFill className="w-3 h-3 text-zinc-400 ml-1" />
    </div>
  );
}

// DoctorTableHeader 컴포넌트
function DoctorTableHeader() {
  return (
    <div className="flex items-center w-full rounded-xl bg-slate-100 bg-opacity-50 min-h-12">
      <TableHeaderCell label="No" flex="flex-[0.6]" />
      <TableHeaderCell label="코드 번호" flex="flex-[0.9]" />
      <TableHeaderCell label="의사명" flex="flex-[0.8]" />
      <TableHeaderCell label="아이디(이메일)" flex="flex-[1.6]" />
      <TableHeaderCell label="가입일" flex="flex-[1.2]" />
      <TableHeaderCell label="권한" flex="flex-[0.9]" />
    </div>
  );
}

// DoctorTableRow 컴포넌트
function DoctorTableRow({ doctor, onRowClick }: DoctorTableRowProps) {
  const handleRowClick = () => {
    onRowClick(doctor);
  };

  return (
    <div
      className={`flex items-center w-full min-h-[68px] text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
        doctor.isAdmin ? 'text-[#0054A6] font-semibold' : 'text-zinc-900 font-normal'
      }`}
      onClick={handleRowClick}
    >
      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto flex-[0.6] whitespace-nowrap min-h-[68px]">
        <div className={`opacity-80 truncate ${doctor.isAdmin ? 'font-semibold' : ''}`}>
          {doctor.id}
        </div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[0.9]">
        <div className="opacity-80 truncate">{doctor.code}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] text-ellipsis flex-[0.8]">
        <div className="truncate">{doctor.name}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[1.6]">
        <div className="opacity-80 truncate">{doctor.email}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto min-h-[68px] flex-[1.2]">
        <div className="opacity-80 truncate">{doctor.date}</div>
      </div>

      <div className="flex justify-center items-center self-stretch py-5 px-3 my-auto font-bold leading-none text-center whitespace-nowrap min-h-[68px] flex-[0.9]">
        <StatusBadge isAdmin={doctor.isAdmin} />
      </div>
    </div>
  );
}

// 메인 DoctorTable 컴포넌트
const DoctorTable: React.FC<DoctorTableProps> = ({ doctors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleRowClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <div className="mt-7 w-full overflow-x-auto">
        <DoctorTableHeader />

        <div className="w-full">
          {doctors.map((doctor, index) => (
            <React.Fragment key={doctor.id}>
              <DoctorTableRow doctor={doctor} onRowClick={handleRowClick} />
              {index < doctors.length - 1 && (
                <div className="w-full h-[1px] bg-[#8395AC] opacity-20"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <IssueCodeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DoctorTable;
