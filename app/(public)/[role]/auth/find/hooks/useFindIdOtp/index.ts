import { useMutation } from '@tanstack/react-query';
import { findIdVerify } from '@/api/admin/common';
import { FindIdVerifyRequest, FindIdVerifyResponse } from '@/api/admin/common/types';
import { ErrorResponse } from '@/api/types';

export const useFindIdOtp = () => {
  return useMutation<FindIdVerifyResponse, ErrorResponse, FindIdVerifyRequest>({
    mutationFn: findIdVerify,
  });
};
