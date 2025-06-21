import { useMutation } from '@tanstack/react-query';
import { findId } from '@/api/admin/common';

export const useFindId = () => {
  return useMutation({
    mutationFn: findId,
  });
};
