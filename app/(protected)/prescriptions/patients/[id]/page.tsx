'use client';

import { useParams, useRouter } from 'next/navigation';
import { useActivePrescription } from './hooks';
import PatientInfoCard from '@/components/PatientInfoCard';
import {
  ActivePrescription,
  MedicalLicenseDetails,
  PrescriptionHistory,
  RehabilitationStatus,
  PatientController,
} from './components';
import { usePatient } from '@/hooks';
import { useDeletePatient } from './hooks';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { showWarningToast } from '@/components/ui/toast-warning';

export default function PatientDetailPage({}) {
  const { id } = useParams();
  const router = useRouter();
  const patientQuery = usePatient(id as string);
  const activePrescriptionQuery = useActivePrescription(Number(id));
  const deletePatientMutation = useDeletePatient();

  const handleRoutePrescribe = () => {
    router.push(`/prescriptions/patients/${id}/prescribe`);
  };

  const handleDeletePatient = () => {
    deletePatientMutation.mutate(
      { patientId: Number(id) },
      {
        onSuccess: () => {
          showSuccessToast('환자 삭제 완료', '환자 등록하기에서 환자를 재등록할 수 있어요.');
          router.replace('/prescriptions/patients');
        },
        onError: () => {
          showWarningToast('환자 삭제 실패', '잠시 후 시도해주세요.');
        },
      }
    );
  };

  const patient = patientQuery.data;
  const activePrescription = activePrescriptionQuery.data;

  if (!patient) return null;

  return (
    <div className="flex flex-col gap-16 lg:gap-22 max-w-[680px] pb-17">
      <PatientInfoCard patient={patient} />
      <ActivePrescription prescription={activePrescription} onClick={handleRoutePrescribe} />
      <PrescriptionHistory patientId={Number(id)} />
      <RehabilitationStatus license={patient.license} />
      <MedicalLicenseDetails />
      <PatientController
        name={patient.name}
        onClick={handleRoutePrescribe}
        onDelete={handleDeletePatient}
      />
    </div>
  );
}
