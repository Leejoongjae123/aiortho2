import { useMutation } from '@tanstack/react-query';
import { postCreatePrescription } from '@/api/prescription';
import {
  PostCreatePrescriptionRequest,
  PostCreatePrescriptionResponse,
} from '@/api/prescription/types';
import { ErrorResponse } from '@/api/types';

export const useCreatePrescription = () => {
  return useMutation<PostCreatePrescriptionResponse, ErrorResponse, PostCreatePrescriptionRequest>({
    mutationFn: postCreatePrescription,
  });
};
