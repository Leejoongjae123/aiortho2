'use client';
import * as React from 'react';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import DraggableTableHeader from './DraggableTableHeader';
import DynamicPatientTableRow from './DynamicPatientTableRow';
import { PatientData, TableColumn } from './types';
import {
  loadNurseHomePatientTableColumnOrder,
  saveNurseHomePatientTableColumnOrder,
  DEFAULT_COLUMNS,
} from './PatientTableUtils';

// StatusBadge 컴포넌트
interface StatusBadgeProps {
  status: string;
  type: 'waiting' | 'prescription';
}

function StatusBadge({ status, type }: StatusBadgeProps) {
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

// TableHeaderCell 컴포넌트
interface TableHeaderCellProps {
  label: string;
  flex: string;
}

function TableHeaderCell({ label, flex }: TableHeaderCellProps) {
  return (
    <div className={`flex justify-center items-center px-3 py-3 my-auto min-h-12 ${flex}`}>
      <h2 className="text-sm font-bold opacity-80 text-zinc-900">{label}</h2>
    </div>
  );
}

// PatientTableHeader 컴포넌트
function PatientTableHeader() {
  return (
    <div className="flex items-center w-full rounded-xl bg-slate-100 bg-opacity-50 min-h-12">
      <TableHeaderCell label="등록번호" flex="flex-[0.8]" />
      <TableHeaderCell label="환자명" flex="flex-[0.7]" />
      <TableHeaderCell label="생년월일" flex="flex-[0.8]" />
      <TableHeaderCell label="성별" flex="flex-[0.5]" />
      <TableHeaderCell label="S/A" flex="flex-[0.6]" />
      <TableHeaderCell label="담당 의사" flex="flex-[0.7]" />
      <TableHeaderCell label="치료 처방 기간" flex="flex-[1.2]" />
      <TableHeaderCell label="환자 등록일" flex="flex-[1.0]" />
      <TableHeaderCell label="최종 처방일" flex="flex-[1.0]" />
      <TableHeaderCell label="처방 상태" flex="flex-[0.8]" />
    </div>
  );
}

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

// 메인 PatientTable 컴포넌트
export interface PatientTableRef {
  resetColumnOrder: () => void;
}

interface PatientTableProps {}

const PatientTable = forwardRef<PatientTableRef, PatientTableProps>((props, ref) => {
  const [columns, setColumns] = useState<TableColumn[]>(DEFAULT_COLUMNS);

  // 컴포넌트 마운트 시 저장된 컬럼 순서 불러오기
  useEffect(() => {
    const savedColumns = loadNurseHomePatientTableColumnOrder();
    setColumns(savedColumns);
  }, []);

  // 컬럼 순서 변경 핸들러
  const handleColumnOrderChange = (newColumns: TableColumn[]) => {
    setColumns(newColumns);
    saveNurseHomePatientTableColumnOrder(newColumns);
  };

  // 컬럼 순서 초기화 핸들러
  const handleResetColumnOrder = () => {
    setColumns(DEFAULT_COLUMNS);
    saveNurseHomePatientTableColumnOrder(DEFAULT_COLUMNS);
  };

  // ref로 외부에서 접근 가능한 함수들 노출
  useImperativeHandle(ref, () => ({
    resetColumnOrder: handleResetColumnOrder,
  }));

  return (
    <div className="mt-7 w-full overflow-x-auto">
      <DraggableTableHeader columns={columns} onColumnOrderChange={handleColumnOrderChange} />

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
    </div>
  );
});

PatientTable.displayName = 'PatientTable';

export default PatientTable;
