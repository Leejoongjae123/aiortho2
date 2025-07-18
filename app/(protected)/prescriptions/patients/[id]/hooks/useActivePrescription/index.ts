import { useQuery } from '@tanstack/react-query';
import { getActivePrescription } from '@/api/prescription';

export const useActivePrescription = (patientId: string) => {
  return useQuery({
    queryKey: ['activePrescription', patientId],
    queryFn: () => getActivePrescription({ patientId }),
  });
};
