import { useMutation } from '@tanstack/react-query';
import { findPassword } from '@/api/admin/common';

export const useFindPassword = () => {
  return useMutation({
    mutationFn: findPassword,
  });
};
