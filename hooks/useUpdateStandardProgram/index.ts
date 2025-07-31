import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStandardProgram } from '@/api/standardProgram';
import {
  UpdateStandardProgramRequest,
  UpdateStandardProgramResponse,
} from '@/api/standardProgram/types';
import { ErrorResponse } from '@/api/types';
import { STANDARD_PROGRAM_QUERY_KEY } from '@/constants/queryKey';

export const useUpdateStandardProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateStandardProgramResponse, ErrorResponse, UpdateStandardProgramRequest>({
    mutationFn: updateStandardProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STANDARD_PROGRAM_QUERY_KEY] });
    },
  });
};
