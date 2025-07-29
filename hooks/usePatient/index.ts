import { useQuery } from '@tanstack/react-query';
import { getPatient } from '@/api/patients';

export const usePatient = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => getPatient({ patientId }),
    enabled: !!patientId,
  });
};
