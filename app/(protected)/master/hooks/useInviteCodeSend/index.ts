import { useMutation } from '@tanstack/react-query';
import { inviteSendCode } from '@/api/admin/root';
import { InviteSendCodeRequest, InviteSendCodeResponse } from '@/api/admin/root/type';
import { ErrorResponse } from '@/api/types';

const useInviteCodeSend = () => {
  return useMutation<InviteSendCodeResponse, ErrorResponse, InviteSendCodeRequest>({
    mutationFn: inviteSendCode,
  });
};

export default useInviteCodeSend;
