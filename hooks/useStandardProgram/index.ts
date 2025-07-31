import { useQuery } from '@tanstack/react-query';
import { getStandardProgramList } from '@/api/standardProgram';
import { GetStandardProgramListResponse } from '@/api/standardProgram/types';
import { ErrorResponse } from '@/api/types';
import { STANDARD_PROGRAM_QUERY_KEY } from '@/constants/queryKey';

export const useStandardProgram = () => {
  return useQuery<GetStandardProgramListResponse, ErrorResponse>({
    queryKey: [STANDARD_PROGRAM_QUERY_KEY],
    queryFn: getStandardProgramList,
  });
};
