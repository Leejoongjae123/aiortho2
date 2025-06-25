import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/admin/common';
import { ResetPasswordRequest } from '@/api/admin/common/types';

type ResetPasswordVariables = {
  data: ResetPasswordRequest;
  token: string;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ data, token }: ResetPasswordVariables) => resetPassword(data, token),
  });
};
