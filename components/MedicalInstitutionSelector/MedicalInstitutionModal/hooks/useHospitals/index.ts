import { useQuery } from '@tanstack/react-query';
import { getHospitalList } from '@/api/admin/common';

export const useHospitals = () => {
  return useQuery({
    queryKey: ['hospitals'],
    queryFn: getHospitalList,
  });
};
