import { useQuery } from '@tanstack/react-query';
import { getDoctorProfile } from '@/api/admin/doctor';
import { DOCTOR_PROFILE_QUERY_KEY } from '@/constants/queryKey';

export const useDoctorProfile = () => {
  return useQuery({
    queryKey: [DOCTOR_PROFILE_QUERY_KEY],
    queryFn: getDoctorProfile,
  });
};
