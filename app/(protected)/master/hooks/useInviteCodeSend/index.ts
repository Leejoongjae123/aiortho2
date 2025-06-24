import { useMutation } from '@tanstack/react-query';
import { inviteSendCode } from '@/api/admin/root';

const useInviteCodeSend = () => {
  return useMutation({
    mutationFn: inviteSendCode,
  });
};

export default useInviteCodeSend;
