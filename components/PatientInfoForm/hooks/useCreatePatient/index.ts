import { useMutation } from '@tanstack/react-query';
import { postPatientCreate } from '@/api/patients';
import { PostCreatePatientRequest, PostCreatePatientResponse } from '@/api/patients/types';
import { ErrorResponse } from '@/api/types';

export const useCreatePatient = () => {
  return useMutation<PostCreatePatientResponse, ErrorResponse, PostCreatePatientRequest>({
    mutationKey: ['createPatient'],
    mutationFn: params => postPatientCreate(params),
  });
};
