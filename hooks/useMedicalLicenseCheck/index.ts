import { useMutation } from '@tanstack/react-query';
import {
  PostDoctorMedicalLicenseCheckRequest,
  PostDoctorMedicalLicenseCheckResponse,
} from '@/api/admin/doctor/types';
import { ErrorResponse } from '@/api/types';
import { postDoctorMedicalLicenseCheck } from '@/api/admin/doctor';

interface PostDoctorMedicalLicenseCheckVariables extends PostDoctorMedicalLicenseCheckRequest {
  token: string;
}

export const useMedicalLicenseCheck = () => {
  return useMutation<
    PostDoctorMedicalLicenseCheckResponse,
    ErrorResponse,
    PostDoctorMedicalLicenseCheckVariables
  >({
    mutationFn: ({ licenseNumber, token }) =>
      postDoctorMedicalLicenseCheck({ licenseNumber }, token),
  });
};
