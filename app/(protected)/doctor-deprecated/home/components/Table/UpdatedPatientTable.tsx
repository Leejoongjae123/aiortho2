'use client';
import React, { useState, useEffect } from 'react';
import DraggableTableHeader from './DraggableTableHeader';
import DynamicPatientTableRow from './DynamicPatientTableRow';
import { PatientData, TableColumn } from './types';
import { loadColumnOrder, saveColumnOrder } from './utils';

// 더미 데이터
const dummyPatients: PatientData[] = [
  {
    id: '1',
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
    id: '2',
    registrationNumber: '82865',
    patientName: '김철수',
    birthDate: '950315',
    gender: '남',
    sa: 'M/12m3d',
    doctor: '김의사',
    treatmentPeriod: '3개월',
    registrationDate: '2025.01.29 (월)',
    lastPrescriptionDate: '2025.01.28',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '3',
    registrationNumber: '82866',
    patientName: '이영희',
    birthDate: '921025',
    gender: '여',
    sa: 'F/6m15d',
    doctor: '박의사',
    treatmentPeriod: '2주',
    registrationDate: '2025.01.28 (일)',
    lastPrescriptionDate: '2025.01.25',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '4',
    registrationNumber: '82867',
    patientName: '정민호',
    birthDate: '880710',
    gender: '남',
    sa: 'M/1y2m',
    doctor: '최의사',
    treatmentPeriod: '1개월',
    registrationDate: '2025.01.27 (토)',
    lastPrescriptionDate: '2025.01.20',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '5',
    registrationNumber: '82868',
    patientName: '강수진',
    birthDate: '990425',
    gender: '여',
    sa: 'F/8m10d',
    doctor: '이의사',
    treatmentPeriod: '6개월',
    registrationDate: '2025.01.26 (금)',
    lastPrescriptionDate: '2025.01.22',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '6',
    registrationNumber: '82869',
    patientName: '윤지현',
    birthDate: '930812',
    gender: '여',
    sa: 'F/4m5d',
    doctor: '김의사',
    treatmentPeriod: '2개월',
    registrationDate: '2025.01.25 (목)',
    lastPrescriptionDate: '2025.01.18',
    status: '처방전',
    statusType: 'prescription',
  },
  {
    id: '7',
    registrationNumber: '82870',
    patientName: '오세훈',
    birthDate: '871203',
    gender: '남',
    sa: 'M/2y1m',
    doctor: '박의사',
    treatmentPeriod: '4개월',
    registrationDate: '2025.01.24 (수)',
    lastPrescriptionDate: '2025.01.15',
    status: '처방전',
    statusType: 'prescription',
  },
  {
    id: '8',
    registrationNumber: '82871',
    patientName: '한소희',
    birthDate: '960318',
    gender: '여',
    sa: 'F/11m20d',
    doctor: '최의사',
    treatmentPeriod: '1주',
    registrationDate: '2025.01.23 (화)',
    lastPrescriptionDate: '2025.01.12',
    status: '처방전',
    statusType: 'prescription',
  },
];

function UpdatedPatientTable() {
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 localStorage에서 컬럼 순서 불러오기
  useEffect(() => {
    const savedColumns = loadColumnOrder();
    setColumns(savedColumns);
    setIsLoading(false);
  }, []);

  // 컬럼 순서 변경 핸들러
  const handleColumnOrderChange = (newColumns: TableColumn[]) => {
    setColumns(newColumns);
    saveColumnOrder(newColumns);
  };

  // 로딩 중이면 기본 레이아웃 표시
  if (isLoading) {
    return (
      <div className="mt-7 w-full overflow-x-auto">
        <div className="flex items-center w-full rounded-xl bg-slate-100 bg-opacity-50 min-h-12">
          <div className="animate-pulse bg-gray-300 h-8 w-full rounded"></div>
        </div>
        <div className="w-full mt-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 h-16 w-full mb-2 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-7 w-full overflow-x-auto">
      {/* 드래그 가능한 헤더 */}
      <DraggableTableHeader columns={columns} onColumnOrderChange={handleColumnOrderChange} />

      {/* 테이블 본문 */}
      <div className="w-full">
        {dummyPatients.map((patient, index) => (
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
            {index < dummyPatients.length - 1 && (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/c914df031f0a54b8061f5d8235a95b70eec4cdf0?placeholderIfAbsent=true"
                className="object-contain w-full stroke-[0.4px] stroke-slate-400"
                alt=""
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 컬럼 순서 초기화 버튼 (개발 목적) */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            localStorage.removeItem('doctor-patient-table-column-order');
            window.location.reload();
          }}
          className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          title="컬럼 순서를 기본값으로 초기화"
        >
          컬럼 순서 초기화
        </button>
      </div>
    </div>
  );
}

export default UpdatedPatientTable;
