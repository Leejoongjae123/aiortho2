import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/admin/common';
import { ResetPasswordRequest, ResetPasswordResponse } from '@/api/admin/common/types';
import { ErrorResponse } from '@/api/types';

type ResetPasswordVariables = {
  data: ResetPasswordRequest;
  token: string;
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, ErrorResponse, ResetPasswordVariables>({
    mutationFn: ({ data, token }: ResetPasswordVariables) => resetPassword(data, token),
  });
};
