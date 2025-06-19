'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { PatientTableColumn, PatientData } from '../types';

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

interface DynamicPatientListRowProps {
  patient: PatientData;
  columns: PatientTableColumn[];
}

export default function DynamicPatientListRow({ patient, columns }: DynamicPatientListRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/doctor/patient/status/${patient.id}`);
  };

  const renderCellContent = (column: PatientTableColumn) => {
    const value = patient[column.id as keyof PatientData];

    if (column.id === 'status') {
      return <StatusBadge status={patient.status} type={patient.statusType} />;
    }

    return <div className="opacity-80 text-zinc-900 truncate">{value || '-'}</div>;
  };

  return (
    <div
      className="flex items-center w-full min-h-[68px] text-sm text-zinc-900 cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-200 rounded-lg"
      onClick={handleRowClick}
    >
      {columns.map(column => (
        <div
          key={column.id}
          className={`flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] ${column.flex}`}
        >
          {renderCellContent(column)}
        </div>
      ))}
    </div>
  );
}
