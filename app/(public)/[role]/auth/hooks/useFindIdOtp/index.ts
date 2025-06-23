import { useMutation } from '@tanstack/react-query';
import { findIdVerify } from '@/api/admin/common';

export const useFindIdOtp = () => {
  return useMutation({
    mutationFn: findIdVerify,
  });
};
