import { useQuery } from '@tanstack/react-query';
import { getNurseProfile } from '@/api/admin/nurse';

export const useNurseProfile = () => {
  return useQuery({
    queryKey: ['nurse-profile'],
    queryFn: getNurseProfile,
  });
};
