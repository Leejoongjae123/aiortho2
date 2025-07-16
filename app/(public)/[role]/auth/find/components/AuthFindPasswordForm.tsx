import React from 'react';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useFindPassword } from '../hooks/useFindPassword';
import Spinner from '@/components/Spinner';
import { AuthFindPasswordFormValues } from '../types';
import { toast } from 'sonner';

const findPasswordSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email({ message: '아이디(이메일)가 올바르지 않아요' }),
  phoneNumber: z.string().min(10, '10자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
});

type FormPasswordValues = z.infer<typeof findPasswordSchema>;

interface AuthFindPasswordFormProps {
  onSubmit?: (data: AuthFindPasswordFormValues) => void;
}

const AuthFindPasswordForm = ({ onSubmit }: AuthFindPasswordFormProps) => {
  const postFindPasswordMutation = useFindPassword();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormPasswordValues>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
    },
  });

  const onSubmitPassword: SubmitHandler<FormPasswordValues> = data => {
    postFindPasswordMutation.mutate(data, {
      onSuccess: () => {
        onSubmit && onSubmit(data);
      },
      onError: err => {
        if (err.statusSubCode === 4002) {
          setError('phoneNumber', {
            message: '유효하지 않은 휴대폰 번호입니다',
          });
          return;
        }

        if (err.statusSubCode === 4028) {
          setError('name', {
            message: ' ',
          });

          setError('email', {
            message: ' ',
          });

          setError('phoneNumber', {
            message: '올바른 정보를 입력해주세요',
          });

          return;
        }

        toast.error('서버 에러가 발생했습니다.', {
          description: '잠시 후 다시 시도해주세요',
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-5 md:space-y-10 mt-4">
      <OrthoInput
        label="이름"
        placeholder="이름을 입력해주세요"
        registration={register('name')}
        error={errors.name?.message}
      />

      <OrthoInput
        label="아이디 (이메일)"
        placeholder="아이디 (이메일)를 입력해주세요"
        registration={register('email')}
        error={errors.email?.message}
      />

      <OrthoInput
        label="휴대폰 번호"
        placeholder="휴대폰 번호을 입력해주세요"
        registration={register('phoneNumber')}
        error={errors.phoneNumber?.message}
      />

      <Button
        type="submit"
        className={'w-full py-5 mt-4 md:mb-16 rounded-full cursor-pointer h-12 text-white'}
        disabled={!isValid || postFindPasswordMutation.isPending}
      >
        {postFindPasswordMutation.isPending ? <Spinner /> : '다음'}
      </Button>
    </form>
  );
};

export default AuthFindPasswordForm;
