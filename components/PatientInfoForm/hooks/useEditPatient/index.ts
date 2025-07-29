import { useMutation } from '@tanstack/react-query';
import { updatePatient } from '@/api/patients';
import { UpdatePatientRequest, UpdatePatientResponse } from '@/api/patients/types';
import { ErrorResponse } from '@/api/types';

export const useEditPatient = (patientId: string) => {
  return useMutation<UpdatePatientResponse, ErrorResponse, UpdatePatientRequest['params']>({
    mutationKey: ['editPatient', patientId],
    mutationFn: params => updatePatient({ patientId, params }),
  });
};
