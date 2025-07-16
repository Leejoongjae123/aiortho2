'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFindIdOtp } from '../hooks/useFindIdOtp';
import { useFindId } from '../hooks/useFindId';
import { useFindPassword } from '../hooks/useFindPassword';
import { useFindPasswordOtp } from '../hooks/useFindPasswordOtp';
import Spinner from '@/components/Spinner';
import { AuthFindIdFormValues, AuthFindPasswordFormValues } from '../types';
import { formatTime } from '@/lib/utils';
import { toast } from 'sonner';

const otpSchema = z.object({
  otp: z.string().min(6, '6자리 이상 입력해주세요').max(6, '6자리 이하 입력해주세요'),
});

type FormOtpValues = z.infer<typeof otpSchema>;

interface AuthFindOtpProps {
  formValues?: AuthFindIdFormValues | AuthFindPasswordFormValues;
  onSubmit?: (values?: string) => void;
}

const MAX_TIME_LIMIT = 300;

const AuthFindOtp = ({ formValues, onSubmit }: AuthFindOtpProps) => {
  const [timer, setTimer] = React.useState(MAX_TIME_LIMIT);
  const [isActive, setIsActive] = React.useState(true);
  const postFindIdMutation = useFindId();
  const postFindIdOtpMutation = useFindIdOtp();
  const postFindPasswordMutation = useFindPassword();
  const postFindPasswordOtpMutation = useFindPasswordOtp();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormOtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handleResendOtp = () => {
    if (!formValues) return;

    if ('email' in formValues) {
      // 비밀번호 찾기
      const values: AuthFindPasswordFormValues = {
        name: formValues.name,
        phoneNumber: formValues.phoneNumber,
        email: formValues.email,
      };

      postFindPasswordMutation.mutate(values, {
        onSuccess: () => {
          setIsActive(true);
          setTimer(MAX_TIME_LIMIT);
        },
      });
    } else {
      // 아이디 찾기
      const values: AuthFindIdFormValues = {
        name: formValues.name,
        phoneNumber: formValues.phoneNumber,
      };

      postFindIdMutation.mutate(values, {
        onSuccess: () => {
          setIsActive(true);
          setTimer(MAX_TIME_LIMIT);
        },
      });
    }
  };

  const onSubmitOtp: SubmitHandler<FormOtpValues> = (data: FormOtpValues) => {
    if (!formValues) return;

    if ('email' in formValues) {
      // 비밀번호 인증
      postFindPasswordOtpMutation.mutate(
        {
          email: formValues.email,
          phoneNumber: formValues.phoneNumber,
          code: data.otp,
        },
        {
          onSuccess: ({ accessToken }) => {
            onSubmit && onSubmit(accessToken);
          },
          onError: err => {
            if (err.statusSubCode === 4024) {
              setError('otp', {
                message: '인증 번호가 일치하지 않아요',
              });
            } else if (err.statusSubCode === 4004) {
              setError('otp', {
                message: '시간이 만료된 인증 번호에요',
              });
            } else {
              toast.error('서버 오류가 발생했습니다.', {
                description: '잠시 후 다시 시도해주세요.',
              });
            }
          },
        }
      );
    } else {
      postFindIdOtpMutation.mutate(
        {
          phoneNumber: formValues.phoneNumber,
          code: data.otp,
        },
        {
          onSuccess: ({ email }) => {
            onSubmit && onSubmit(email);
          },
          onError: err => {
            if (err.statusSubCode === 4024) {
              setError('otp', {
                message: '인증 번호가 일치하지 않아요',
              });
            } else if (err.statusSubCode === 4004) {
              setError('otp', {
                message: '시간이 만료된 인증 번호에요',
              });
            } else {
              toast.error('서버 오류가 발생했습니다.', {
                description: '잠시 후 다시 시도해주세요.',
              });
            }
          },
        }
      );
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer, isActive]);

  if (!formValues?.phoneNumber) return null;

  return (
    <div className="w-[95%] md:w-[40%] mx-auto">
      <div className="space-y-3">
        <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">인증 번호 입력</h1>
        <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
          {formValues.phoneNumber}로 인증 번호를 보냈어요.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmitOtp)} className="space-y-10 mt-8">
        <OrthoInput
          label="인증 번호"
          placeholder="인증번호 6자리"
          registration={register('otp')}
          error={errors.otp?.message}
          maxLength={6}
          rightIcon={
            <div className="flex items-center gap-2 md:gap-5 py-2 cursor-default">
              <p className="text-sm font-normal text-[color:var(--aiortho-gray-400)]">
                {formatTime(timer)}
              </p>

              <Button
                type="button"
                onClick={handleResendOtp}
                className="text-white bg-[color:var(--aiortho-gray-500)] hover:bg-[color:var(--aiortho-gray-500)]/90 disabled:bg-[color:var(--aiortho-gray-200)] cursor-pointer"
                disabled={
                  postFindIdMutation.isPending || postFindIdOtpMutation.isPending || isActive
                }
              >
                {postFindIdMutation.isPending ? <Spinner /> : '인증번호 전송'}
              </Button>
            </div>
          }
        />

        <Button
          type="submit"
          disabled={!isActive || !isValid || postFindIdOtpMutation.isPending}
          className="w-full text-white cursor-pointer py-5 mt-4 rounded-full"
        >
          {postFindIdOtpMutation.isPending ? <Spinner /> : '다음'}
        </Button>
      </form>
    </div>
  );
};

export default AuthFindOtp;
