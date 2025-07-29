'use client';

import { useParams } from 'next/navigation';
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

export default function PatientDetailPage({}) {
  const { id } = useParams();
  const patientQuery = usePatient(id as string);
  const activePrescriptionQuery = useActivePrescription(Number(id));

  const patient = patientQuery.data;
  const activePrescription = activePrescriptionQuery.data;

  if (!patient) return null;

  return (
    <div className="flex flex-col gap-16 lg:gap-22 max-w-[680px] pb-17">
      <PatientInfoCard patient={patient} />
      <ActivePrescription prescription={activePrescription} />
      <PrescriptionHistory patientId={Number(id)} />
      <RehabilitationStatus license={patient.license} />
      <MedicalLicenseDetails />
      <PatientController />
    </div>
  );
}
