import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getDoctorProfile } from '@/api/admin/doctor';
import { DOCTOR_PROFILE_QUERY_KEY } from '@/constants/queryKey';

interface UseDoctorProfileProps extends Partial<UseQueryOptions> {
  enabled?: boolean;
}

export const useDoctorProfile = ({ enabled = true }: UseDoctorProfileProps) => {
  return useQuery({
    queryKey: [DOCTOR_PROFILE_QUERY_KEY],
    queryFn: getDoctorProfile,
    enabled,
  });
};
