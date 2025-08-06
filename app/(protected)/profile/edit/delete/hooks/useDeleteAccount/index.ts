import { useMutation } from '@tanstack/react-query';
import { postDeleteAccount } from '@/api/admin/common';
import { PostDeleteAccountRequest, PostDeleteAccountResponse } from '@/api/admin/common/types';
import { ErrorResponse } from '@/api/types';

export const useDeleteAccount = () => {
  return useMutation<PostDeleteAccountResponse, ErrorResponse, PostDeleteAccountRequest>({
    mutationFn: postDeleteAccount,
  });
};
