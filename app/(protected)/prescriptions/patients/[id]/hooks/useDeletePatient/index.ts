import { useMutation } from '@tanstack/react-query';
import { deletePatient } from '@/api/patients';
import { DeletePatientRequest, DeletePatientResponse } from '@/api/patients/types';
import { ErrorResponse } from '@/api/types';

export const useDeletePatient = () => {
  return useMutation<DeletePatientResponse, ErrorResponse, DeletePatientRequest>({
    mutationFn: deletePatient,
  });
};
