import { useMutation } from '@tanstack/react-query';
import { postPatientCreate } from '@/api/patients';
import { PostCreatePatientRequest, PostCreatePatientResponse } from '@/api/patients/types';

export default function useCreatePatient() {
  return useMutation<PostCreatePatientResponse, Error, PostCreatePatientRequest>({
    mutationFn: postPatientCreate,
  });
}
