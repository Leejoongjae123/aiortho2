import { useQuery } from '@tanstack/react-query';
import { getDoctorProfile } from '@/api/admin/doctor';
import { getNurseProfile } from '@/api/admin/nurse';
import { UserRole } from '@/models';
import { GetNurseProfileResponse } from '@/api/admin/nurse/types';
import { GetDoctorProfileResponse } from '@/api/admin/doctor/types';

export const isDoctorRole = (role: UserRole): role is 'Doctor' | 'Root' => {
  return role === 'Doctor' || role === 'Root';
};

export const useProfile = (role: UserRole) => {
  return useQuery({
    queryKey: ['profile', role],
    queryFn: async (): Promise<GetDoctorProfileResponse | GetNurseProfileResponse> => {
      if (isDoctorRole(role)) {
        return await getDoctorProfile();
      } else {
        return await getNurseProfile();
      }
    },
  });
};
