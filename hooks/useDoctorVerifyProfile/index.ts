import { useMutation } from '@tanstack/react-query';
import { postDoctorProfileVerify } from '@/api/admin/doctor';
import {
  PostDoctorProfileVerifyRequest,
  PostDoctorProfileVerifyResponse,
} from '@/api/admin/doctor/types';
import { ErrorResponse } from '@/api/types';

export const useDoctorVerifyProfile = () => {
  return useMutation<
    PostDoctorProfileVerifyResponse,
    ErrorResponse,
    PostDoctorProfileVerifyRequest
  >({
    mutationFn: postDoctorProfileVerify,
  });
};
