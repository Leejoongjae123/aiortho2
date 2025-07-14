'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StatusBadge } from '@/components/Badge';
import { Patient, PrescriptionStatus } from '@/models';
import { formatPeriod, formatISODate } from '@/lib/utils';
import { TableColumn } from '../types';

interface PatientTableRowProps {
  patient: Patient;
  columnOrder: TableColumn[];
}

const PatientTableRow = ({ patient, columnOrder }: PatientTableRowProps) => {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/prescriptions/patients/${patient.patientId}`);
  };

  // 컬럼 데이터 렌더링 함수
  const renderCellContent = (columnKey: string) => {
    if (columnKey === '병원 환자 번호') {
      return patient.hospitalPatientNum;
    }

    if (columnKey === '환자명') {
      return patient.name;
    }

    if (columnKey === '생년월일') {
      return patient.birth;
    }

    if (columnKey === 'S/A') {
      return `${patient.gender}/${patient.age}`;
    }

    if (columnKey === '담당 의사') {
      return patient.doctorName ?? '-';
    }

    if (columnKey === '치료 처방 기간') {
      if (patient.prescription?.startDate && patient.prescription?.endDate) {
        return formatPeriod(patient.prescription.startDate, patient.prescription.endDate);
      }
    }

    if (columnKey === '환자 등록일') {
      return formatISODate(patient.createdAt, true);
    }

    if (columnKey === '최종 처방일') {
      if (patient.updatedAt) {
        return formatISODate(patient.updatedAt, true);
      }
    }

    if (columnKey === '처방 상태') {
      return <StatusBadge status={patient.prescriptionStatus ?? PrescriptionStatus.Not_Created} />;
    }

    return '-';
  };

  return (
    <div
      className="flex items-center w-full min-h-[68px] text-sm text-zinc-900 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleRowClick}
    >
      {columnOrder.map(column => (
        <div
          key={column.id}
          className={`flex justify-center items-center self-stretch px-2.5 py-7 my-auto min-h-[68px] ${column.flex} ${
            column.label === '처방 상태'
              ? 'font-bold leading-none text-center whitespace-nowrap'
              : 'whitespace-nowrap'
          }`}
        >
          <div className="opacity-80 text-zinc-900 truncate text-ellipsis">
            {renderCellContent(column.label)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientTableRow;
