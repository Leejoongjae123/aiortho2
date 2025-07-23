import { useQuery } from '@tanstack/react-query';
import { getPrescriptionHistory } from '@/api/prescription';
import { GetPrescriptionHistoryRequest } from '@/api/prescription/types';

interface UsePrescriptionHistoryProps {
  patientId: number;
  params: GetPrescriptionHistoryRequest;
}

export const usePrescriptionHistory = ({ patientId, params }: UsePrescriptionHistoryProps) => {
  return useQuery({
    queryKey: ['prescriptionHistory', patientId, params],
    queryFn: () => getPrescriptionHistory(patientId, params),
  });
};
