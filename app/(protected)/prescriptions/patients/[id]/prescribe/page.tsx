'use client';

import { useParams } from 'next/navigation';
import { usePatient } from '@/hooks';
import PatientInfoCard from '@/components/PatientInfoCard';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProgramCreateModal } from './components';
import { useStandardProgram } from './hooks';
import PrescriptionProgramCard from '@/components/PrescriptionProgramCard';
import { Prescription } from '@/models';

export default function CreatePrescriptionPage() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const patientQuery = usePatient(id as string);
  const standardProgramQuery = useStandardProgram();
  const [prescriptionProgram, setPrescriptionProgram] = useState<Prescription>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectProgram = (program: Prescription) => {
    setPrescriptionProgram(program);
  };

  if (!patientQuery.data || !standardProgramQuery.data) {
    return null;
  }

  const { data: patient } = patientQuery;
  const { data: standardProgram } = standardProgramQuery;

  return (
    <section className="flex flex-col max-w-[680px]">
      <h1 className="text-2xl font-bold text-[var(--aiortho-gray-900)] lg:text-3xl mb-8">
        처방하기
      </h1>
      <PatientInfoCard patient={patient} hidePrescription />

      <h1 className="text-2xl font-bold text-[var(--aiortho-gray-900)] lg:text-3xl mt-22 mb-3">
        치료 프로그램 구성
      </h1>
      <h2 className="text-[var(--aiortho-gray-600)] mb-8">
        환자에게 처방할 치료 운동 종류를 선택해주세요
      </h2>

      {prescriptionProgram ? (
        <PrescriptionProgramCard prescription={prescriptionProgram} defaultIsOpen />
      ) : (
        <button
          type="button"
          onClick={handleOpenModal}
          className="flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl border border-[var(--aiortho-primary)] cursor-pointer mb-3"
        >
          <Plus className="w-5 h-5 text-[var(--aiortho-primary)] font-bold" />
          <span className="text-base text-[var(--aiortho-primary)] font-bold">프로그램 생성</span>
        </button>
      )}

      <ProgramCreateModal
        isOpen={isModalOpen}
        standardProgram={standardProgram.presets}
        onClose={handleCloseModal}
        onSelect={handleSelectProgram}
      />
    </section>
  );
}
