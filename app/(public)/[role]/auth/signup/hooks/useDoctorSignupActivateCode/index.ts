import { useMutation } from '@tanstack/react-query';
import { doctorSignUpActivateCode } from '@/api/admin/doctor';

export const useDoctorSignupActivateCode = () => {
  return useMutation({
    mutationFn: doctorSignUpActivateCode,
  });
};
