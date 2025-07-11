import { useQuery } from '@tanstack/react-query';
import { getPatientList } from '@/api/patients';
import { PatientListRequest } from '@/api/patients/types';

const QUERY_KEY = 'patients';

export const usePatients = (params: PatientListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getPatientList(params),
  });
};
