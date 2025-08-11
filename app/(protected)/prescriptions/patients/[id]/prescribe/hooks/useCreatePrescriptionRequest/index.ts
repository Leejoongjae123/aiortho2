import { useMutation } from '@tanstack/react-query';
import { postCreatePrescriptionRequest } from '@/apis/prescription';
import {
  PostCreatePrescriptionRequestRequest,
  PostCreatePrescriptionRequestResponse,
} from '@/apis/prescription/types';
import { ErrorResponse } from '@/apis/types';

export const useCreatePrescriptionRequest = () => {
  return useMutation<
    PostCreatePrescriptionRequestResponse,
    ErrorResponse,
    PostCreatePrescriptionRequestRequest
  >({
    mutationFn: postCreatePrescriptionRequest,
  });
};
