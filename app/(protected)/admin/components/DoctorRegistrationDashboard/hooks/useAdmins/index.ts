import { useQuery } from '@tanstack/react-query';
import { getAdmins } from '@/api/admin/root';
import { GetAdminsRequest } from '@/api/admin/root/type';

export const useAdmins = (params: GetAdminsRequest) => {
  return useQuery({
    queryKey: ['admins', params],
    queryFn: () => getAdmins(params),
  });
};
