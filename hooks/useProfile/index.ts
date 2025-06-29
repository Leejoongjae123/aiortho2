import { useQuery } from '@tanstack/react-query';
import { getDoctorProfile } from '@/api/admin/doctor';
import { getNurseProfile } from '@/api/admin/nurse';
import { UserRole, DoctorProfile, NurseProfile } from '@/models';

// 타입 가드 함수들
const isDoctorRole = (role: UserRole): role is 'Doctor' | 'Root' => {
  return role === 'Doctor' || role === 'Root';
};

const useProfile = (role: UserRole) => {
  return useQuery({
    queryKey: ['profile', role],
    queryFn: async (): Promise<DoctorProfile | NurseProfile> => {
      if (isDoctorRole(role)) {
        return await getDoctorProfile();
      } else {
        return await getNurseProfile();
      }
    },
  });
};

export default useProfile;
