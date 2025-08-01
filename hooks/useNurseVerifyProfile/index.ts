import { useMutation } from '@tanstack/react-query';
import { postNurseProfileVerify } from '@/api/admin/nurse';
import {
  PostNurseProfileVerifyRequest,
  PostNurseProfileVerifyResponse,
} from '@/api/admin/nurse/types';
import { ErrorResponse } from '@/api/types';

export const useNurseVerifyProfile = () => {
  return useMutation<PostNurseProfileVerifyResponse, ErrorResponse, PostNurseProfileVerifyRequest>({
    mutationFn: postNurseProfileVerify,
  });
};
