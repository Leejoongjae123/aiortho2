import { useMutation } from '@tanstack/react-query';
import { postPhoneVerifySend } from '@/api/admin/common';

const usePhoneVerifySend = () => {
  return useMutation({
    mutationFn: postPhoneVerifySend,
  });
};

export default usePhoneVerifySend;
