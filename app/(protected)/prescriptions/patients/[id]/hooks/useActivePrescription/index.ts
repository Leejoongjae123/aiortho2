import { useQuery } from '@tanstack/react-query';
import { getActivePrescription } from '@/api/prescription';

export const useActivePrescription = (patientId: number) => {
  return useQuery({
    queryKey: ['activePrescription', patientId],
    queryFn: () => getActivePrescription({ patientId }),
  });
};
