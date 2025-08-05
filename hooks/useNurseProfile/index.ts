import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getNurseProfile } from '@/api/admin/nurse';
import { NURSE_PROFILE_QUERY_KEY } from '@/constants/queryKey';

interface UseNurseProfileProps extends Partial<UseQueryOptions> {
  enabled?: boolean;
}

export const useNurseProfile = ({ enabled = true }: UseNurseProfileProps) => {
  return useQuery({
    queryKey: [NURSE_PROFILE_QUERY_KEY],
    queryFn: getNurseProfile,
    enabled,
  });
};
