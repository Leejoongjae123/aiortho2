import { useQuery } from '@tanstack/react-query';
import { getDoctorProfile } from '@/api/admin/doctor';

export const useDoctorProfile = () => {
  return useQuery({
    queryKey: ['doctor-profile'],
    queryFn: getDoctorProfile,
  });
};
