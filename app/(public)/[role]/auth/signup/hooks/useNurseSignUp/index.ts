import { useMutation } from '@tanstack/react-query';
import { postNurseSignUp } from '@/apis/admin/nurse';
import { PostNurseSignUpRequest, PostNurseSignUpResponse } from '@/apis/admin/nurse/types';
import { ErrorResponse } from '@/apis/types';

export const useNurseSignUp = () => {
  return useMutation<PostNurseSignUpResponse, ErrorResponse, PostNurseSignUpRequest>({
    mutationFn: (data: PostNurseSignUpRequest) => postNurseSignUp(data),
  });
};
