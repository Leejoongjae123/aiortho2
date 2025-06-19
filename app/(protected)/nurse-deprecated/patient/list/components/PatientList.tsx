'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { RiExpandUpDownFill } from 'react-icons/ri';
import {
  PatientData,
  StatusBadgeProps,
  TableHeaderCellProps,
  PatientTableRowProps,
} from '../types';

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

// TableHeaderCell 컴포넌트
function TableHeaderCell({ label, flex }: TableHeaderCellProps) {
  return (
    <div className={`flex justify-center items-center px-3 py-3 my-auto min-h-12 ${flex}`}>
      <h2 className="text-sm font-bold opacity-80 text-zinc-900">{label}</h2>
      <RiExpandUpDownFill className="w-3 h-3 text-zinc-400 ml-1" />
    </div>
  );
}

// PatientTableHeader 컴포넌트
function PatientTableHeader() {
  return (
    <div className="flex items-center w-full rounded-xl bg-slate-100 bg-opacity-50 min-h-12 sticky top-0 z-10">
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

// PatientTableRow 컴포넌트
function PatientTableRow({
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
}: PatientTableRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/doctor/patient/status/${id}`);
  };

  return (
    <div
      className="flex items-center w-full min-h-[68px] text-sm text-zinc-900 cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-200 rounded-lg"
      onClick={handleRowClick}
    >
      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto flex-[0.8] whitespace-nowrap min-h-[68px]">
        <div className="opacity-80 text-zinc-900 truncate">{registrationNumber}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] text-ellipsis text-zinc-900 flex-[0.7]">
        <div className="truncate">{patientName}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[0.8]">
        <div className="opacity-80 text-zinc-900 truncate">{birthDate}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[0.5]">
        <div className="opacity-80 text-zinc-900">{gender}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto flex-[0.6] whitespace-nowrap min-h-[68px]">
        <div className="opacity-80 text-zinc-900 truncate">{sa}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[0.7]">
        <div className="opacity-80 text-ellipsis text-zinc-900 truncate">{doctor}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[1.2]">
        <div className="opacity-80 text-zinc-900 truncate">{treatmentPeriod}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto min-h-[68px] flex-[1.0]">
        <div className="opacity-80 text-zinc-900 truncate">{registrationDate}</div>
      </div>

      <div className="flex justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[1.0]">
        <div className="opacity-80 text-zinc-900 truncate">{lastPrescriptionDate}</div>
      </div>

      <div className="flex justify-center items-center self-stretch py-5 px-3 my-auto font-bold leading-none text-center whitespace-nowrap min-h-[68px] flex-[0.8]">
        <StatusBadge status={status} type={statusType} />
      </div>
    </div>
  );
}

// 기존 mock 데이터를 새로운 구조에 맞게 변환
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

// 메인 PatientList 컴포넌트
function PatientList() {
  return (
    <div className="mt-7 w-full">
      <div className="min-w-[1080px] md:min-w-0">
        <PatientTableHeader />

        <div className="w-full">
          {patients.map((patient, index) => (
            <React.Fragment key={patient.id}>
              <PatientTableRow
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
              />
              {index < patients.length - 1 && <div className="w-full h-px bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientList;
