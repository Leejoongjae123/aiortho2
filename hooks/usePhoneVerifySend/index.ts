import { useMutation } from '@tanstack/react-query';
import { postPhoneVerifySend } from '@/api/admin/common';
import { ErrorResponse } from '@/api/types';
import { PostPhoneVerifyRequest, PostPhoneVerifyResponse } from '@/api/admin/common/types';

const usePhoneVerifySend = () => {
  return useMutation<PostPhoneVerifyResponse, ErrorResponse, PostPhoneVerifyRequest>({
    mutationFn: postPhoneVerifySend,
  });
};

export default usePhoneVerifySend;
