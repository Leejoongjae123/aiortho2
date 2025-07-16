import { useMutation } from '@tanstack/react-query';
import { findPassword } from '@/api/admin/common';
import { ErrorResponse } from '@/api/types';
import { FindPasswordRequest, FindPasswordResponse } from '@/api/admin/common/types';

export const useFindPassword = () => {
  return useMutation<FindPasswordResponse, ErrorResponse, FindPasswordRequest>({
    mutationFn: findPassword,
  });
};
