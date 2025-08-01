import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putDoctorProfile } from '@/api/admin/doctor';
import { PutDoctorProfileRequest, PutDoctorProfileResponse } from '@/api/admin/doctor/types';
import { DOCTOR_PROFILE_QUERY_KEY } from '@/constants/queryKey';
import { ErrorResponse } from '@/api/types';

export const useUpdateDoctorProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<PutDoctorProfileResponse, ErrorResponse, PutDoctorProfileRequest>({
    mutationFn: putDoctorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCTOR_PROFILE_QUERY_KEY] });
    },
  });
};
