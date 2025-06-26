import { useMutation } from '@tanstack/react-query';
import { checkEmail } from '@/api/admin/common';
import { CheckEmailRequest, CheckEmailResponse } from '@/api/admin/common/types';
import { ErrorResponse } from '@/api/types';

export const useCheckEmail = () => {
  return useMutation<CheckEmailResponse, ErrorResponse, CheckEmailRequest>({
    mutationFn: checkEmail,
  });
};
