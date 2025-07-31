import { useMutation } from '@tanstack/react-query';
import { postDoctorProfileVerify } from '@/api/admin/doctor';
import { isDoctorRole } from '@/hooks';
import { UserRole } from '@/models';
import {
  PostDoctorProfileVerifyRequest,
  PostDoctorProfileVerifyResponse,
} from '@/api/admin/doctor/types';
import { ErrorResponse } from '@/api/types';

export const useVerifyProfile = (role: UserRole) => {
  return useMutation<
    PostDoctorProfileVerifyResponse,
    ErrorResponse,
    PostDoctorProfileVerifyRequest
  >({
    mutationFn: async data => {
      if (isDoctorRole(role)) {
        return await postDoctorProfileVerify(data);
      } else {
        // TODO: 간호사 프로필 인증 로직
        return await postDoctorProfileVerify(data);
      }
    },
  });
};
