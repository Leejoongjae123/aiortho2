'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { PatientTableRowProps, TableColumn } from '../types';

function StatusBadge({
  status,
  type,
}: {
  status: string;
  type: 'waiting' | 'prescription' | 'completed';
}) {
  const colorClasses = {
    waiting: {
      text: 'text-[#0CA147]',
      bg: 'bg-[#73E484]/20',
      dot: 'bg-[#0CA147]',
    },
    prescription: {
      text: 'text-sky-600',
      bg: 'bg-sky-500/20',
      dot: 'bg-sky-600',
    },
    completed: {
      text: 'text-gray-600',
      bg: 'bg-gray-500/20',
      dot: 'bg-gray-600',
    },
  };

  const { text, bg, dot } = colorClasses[type];

  return (
    <div className={`flex gap-1 justify-center items-center px-3 py-1 rounded-2xl ${bg} min-h-7`}>
      <div
        className={`flex shrink-0 self-stretch my-auto w-2 h-2 ${dot} rounded-full`}
        aria-hidden="true"
      />
      <div className={`self-stretch my-auto ${text}`}>{status}</div>
    </div>
  );
}

export default function DynamicPatientTableRow({
  id,
  registrationNumber,
  patientName,
  birthDate,
  gender,
  sa,
  doctor,
  treatmentPeriod,
  registrationDate,
  lastPrescriptionDate,
  status,
  statusType,
  columnOrder = [],
}: PatientTableRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/doctor/patient/status/${id}`);
  };

  // 환자 데이터 객체
  const patientData = {
    id,
    registrationNumber,
    patientName,
    birthDate,
    gender,
    sa,
    doctor,
    treatmentPeriod,
    registrationDate,
    lastPrescriptionDate,
    status,
    statusType,
  };

  // 셀 렌더링 함수
  const renderCell = (column: TableColumn) => {
    const value = patientData[column.key];

    if (column.key === 'status') {
      return (
        <div className="flex justify-center items-center self-stretch py-5 px-3 my-auto font-bold leading-none text-center whitespace-nowrap min-h-[68px]">
          <StatusBadge status={status} type={statusType} />
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px]">
        <div className="opacity-80 text-zinc-900 truncate">{value || '-'}</div>
      </div>
    );
  };

  return (
    <div
      className="flex items-center w-full min-h-[68px] text-sm text-zinc-900 cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-200 rounded-lg"
      onClick={handleRowClick}
    >
      {columnOrder.map(column => (
        <div key={column.id} className={column.flex}>
          {renderCell(column)}
        </div>
      ))}
    </div>
  );
}
