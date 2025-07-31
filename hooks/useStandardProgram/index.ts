import { useQuery } from '@tanstack/react-query';
import { getStandardProgramList } from '@/api/standardProgram';
import { GetStandardProgramListResponse } from '@/api/standardProgram/types';
import { ErrorResponse } from '@/api/types';

export const useStandardProgram = () => {
  return useQuery<GetStandardProgramListResponse, ErrorResponse>({
    queryKey: ['standardProgram'],
    queryFn: getStandardProgramList,
  });
};
