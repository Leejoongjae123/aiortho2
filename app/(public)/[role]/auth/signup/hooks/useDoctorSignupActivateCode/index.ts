import { useMutation } from '@tanstack/react-query';
import { doctorSignUpActivateCode } from '@/api/admin/doctor';

const useDoctorSignupActivateCode = () => {
  return useMutation({
    mutationFn: doctorSignUpActivateCode,
  });
};

export default useDoctorSignupActivateCode;
