import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreateStandardProgram } from '@/api/standardProgram';
import {
  PostCreateStandardProgramRequest,
  PostCreateStandardProgramResponse,
} from '@/api/standardProgram/types';
import { ErrorResponse } from '@/api/types';
import { STANDARD_PROGRAM_QUERY_KEY } from '@/constants/queryKey';

export const useCreateStandardProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PostCreateStandardProgramResponse,
    ErrorResponse,
    PostCreateStandardProgramRequest
  >({
    mutationFn: postCreateStandardProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STANDARD_PROGRAM_QUERY_KEY] });
    },
  });
};
