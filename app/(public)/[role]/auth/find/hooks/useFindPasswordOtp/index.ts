import { useMutation } from '@tanstack/react-query';
import { findPasswordVerify } from '@/api/admin/common';
import { ErrorResponse } from '@/api/types';
import { FindPasswordVerifyRequest, FindPasswordVerifyResponse } from '@/api/admin/common/types';

export const useFindPasswordOtp = () => {
  return useMutation<FindPasswordVerifyResponse, ErrorResponse, FindPasswordVerifyRequest>({
    mutationFn: findPasswordVerify,
  });
};
