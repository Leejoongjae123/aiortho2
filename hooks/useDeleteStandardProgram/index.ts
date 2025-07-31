import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStandardProgram } from '@/api/standardProgram';
import {
  DeleteStandardProgramRequest,
  DeleteStandardProgramResponse,
} from '@/api/standardProgram/types';
import { ErrorResponse } from '@/api/types';
import { STANDARD_PROGRAM_QUERY_KEY } from '@/constants/queryKey';

export const useDeleteStandardProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteStandardProgramResponse, ErrorResponse, DeleteStandardProgramRequest>({
    mutationFn: deleteStandardProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STANDARD_PROGRAM_QUERY_KEY] });
    },
  });
};
