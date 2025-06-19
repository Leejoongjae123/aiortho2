'use client';
import React, { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import DraggableTableHeader from './DraggableTableHeader';
import DynamicPatientTableRow from './DynamicPatientTableRow';
import { PatientData, TableColumn } from '../types';
import {
  DEFAULT_COLUMNS,
  loadNursePatientListColumnOrder,
  saveNursePatientListColumnOrder,
} from './PatientListUtils';

// Mock 데이터
const patients: PatientData[] = [
  {
    id: '1',
    registrationNumber: '82869',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '홍지원',
    treatmentPeriod: '2025.01.30 ~ 2025.01.30',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '2025.01.30 (화)',
    status: '완료',
    statusType: 'completed',
  },
  {
    id: '2',
    registrationNumber: '82870',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '처방전',
    statusType: 'prescription',
  },
  {
    id: '3',
    registrationNumber: '82866',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '김지희',
    treatmentPeriod: '2025.01.30 ~ 2025.01.30',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '2025.01.30 (화)',
    status: '처방전',
    statusType: 'prescription',
  },
  {
    id: '4',
    registrationNumber: '82864',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '5',
    registrationNumber: '82864',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '6',
    registrationNumber: '82865',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/87d',
    doctor: '김지희',
    treatmentPeriod: '2025.01.30 ~ 2025.01.30',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '2025.01.30 (화)',
    status: '완료',
    statusType: 'completed',
  },
  {
    id: '7',
    registrationNumber: '82864',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '완료',
    statusType: 'completed',
  },
  {
    id: '8',
    registrationNumber: '82864',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '완료',
    statusType: 'completed',
  },
];

export default function UpdatedPatientList() {
  const [columns, setColumns] = useState<TableColumn[]>(DEFAULT_COLUMNS);

  // 컴포넌트 마운트 시 저장된 컬럼 순서 불러오기
  useEffect(() => {
    setColumns(loadNursePatientListColumnOrder());
  }, []);

  // 컬럼 순서 변경 핸들러
  const handleColumnOrderChange = (newColumns: TableColumn[]) => {
    setColumns(newColumns);
    saveNursePatientListColumnOrder(newColumns);
  };

  return (
    <div className="mt-7 w-full">
      <div className="min-w-[1080px] md:min-w-0">
        <DraggableTableHeader columns={columns} onColumnOrderChange={handleColumnOrderChange} />

        <div className="w-full">
          {patients.map((patient, index) => (
            <React.Fragment key={patient.id}>
              <DynamicPatientTableRow
                id={patient.id}
                registrationNumber={patient.registrationNumber}
                patientName={patient.patientName}
                birthDate={patient.birthDate}
                gender={patient.gender}
                sa={patient.sa}
                doctor={patient.doctor}
                treatmentPeriod={patient.treatmentPeriod}
                registrationDate={patient.registrationDate}
                lastPrescriptionDate={patient.lastPrescriptionDate}
                status={patient.status}
                statusType={patient.statusType}
                columnOrder={columns}
              />
              {index < patients.length - 1 && <div className="w-full h-px bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
