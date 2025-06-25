import { useMutation } from '@tanstack/react-query';
import { findPasswordVerify } from '@/api/admin/common';

export const useFindPasswordOtp = () => {
  return useMutation({
    mutationFn: findPasswordVerify,
  });
};
