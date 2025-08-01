import { useMutation } from '@tanstack/react-query';
import { postPhoneVerifySend } from '@/api/admin/common';
import { ErrorResponse } from '@/api/types';
import { PostPhoneVerifySendRequest, PostPhoneVerifySendResponse } from '@/api/admin/common/types';

export const usePhoneVerifySend = () => {
  return useMutation<PostPhoneVerifySendResponse, ErrorResponse, PostPhoneVerifySendRequest>({
    mutationFn: postPhoneVerifySend,
  });
};
