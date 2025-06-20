'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { PatientTableRowProps } from './types';
import StatusBadge from './StatusBadge';

function DynamicPatientTableRow({
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
  columnOrder,
}: PatientTableRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/doctor/patient/status/${id}`);
  };

  // 데이터 맵핑
  const patientData: Record<string, any> = {
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
    id,
  };

  // 컬럼 데이터 렌더링 함수
  const renderCellContent = (columnKey: string, value: any) => {
    if (columnKey === 'status') {
      return <StatusBadge status={status} type={statusType} />;
    }

    // 기본 텍스트 렌더링
    return <div className="opacity-80 text-zinc-900 truncate">{value || '-'}</div>;
  };

  return (
    <div
      className="flex items-center w-full min-h-[68px] text-sm text-zinc-900 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleRowClick}
    >
      {columnOrder.map(column => {
        const cellValue = patientData[column.key];

        return (
          <div
            key={column.id}
            className={`flex justify-center items-center self-stretch px-2.5 py-7 my-auto min-h-[68px] ${column.flex} ${
              column.key === 'status'
                ? 'font-bold leading-none text-center whitespace-nowrap'
                : 'whitespace-nowrap'
            }`}
          >
            {column.key === 'status' ? (
              renderCellContent(column.key, cellValue)
            ) : (
              <div
                className={`truncate ${column.key === 'patientName' || column.key === 'doctor' ? 'text-ellipsis' : ''}`}
              >
                {renderCellContent(column.key, cellValue)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DynamicPatientTableRow;
