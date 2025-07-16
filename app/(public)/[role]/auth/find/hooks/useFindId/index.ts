import { useMutation } from '@tanstack/react-query';
import { findId } from '@/api/admin/common';
import { FindIdRequest, FindIdResponse } from '@/api/admin/common/types';
import { ErrorResponse } from '@/api/types';

export const useFindId = () => {
  return useMutation<FindIdResponse, ErrorResponse, FindIdRequest>({
    mutationFn: findId,
  });
};
