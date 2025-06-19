'use client';
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

const otpSchema = z.object({
  otp: z.string().min(6, '6자리 이상 입력해주세요').max(6, '6자리 이하 입력해주세요'),
});

type FormOtpValues = z.infer<typeof otpSchema>;

const Otp = () => {
  const [timer, setTimer] = React.useState(300);
  const [isActive, setIsActive] = React.useState(true);
  let error = true;

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

  useEffect(() => {
    console.log(timer);
  }, [timer]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormOtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit: SubmitHandler<FormOtpValues> = (data: FormOtpValues) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center bg-white w-full h-full justify-start pt-[20vh]">
      <div className="w-[95%] md:w-[40%] mx-auto">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">
            인증 번호 입력
          </h1>
          <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
            01027272727로 인증 번호를 보냈어요.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-8">
          <OrthoInput
            label="인증 번호"
            placeholder="인증번호 6자리"
            registration={register('otp')}
            error={errors.otp?.message}
            maxLength={6}
            apiResponse={error}
            // apiResponseMessage={"인증 번호가 일치하지 않아요"}
            required
            rightIcon={
              <div className="flex items-center gap-2 md:gap-5 py-2">
                <p className="text-sm font-normal text-[color:var(--aiortho-gray-400)]">
                  {formatTime(timer)}
                </p>
                <Button
                  className={`text-white ${
                    timer === 0
                      ? 'bg-[color:var(--aiortho-gray-500)] hover:bg-[color:var(--aiortho-gray-500)]'
                      : 'bg-[color:var(--aiortho-gray-200)] hover:bg-[color:var(--aiortho-gray-200)]'
                  }  rounded-md h-8 font-medium text-[13px]`}
                >
                  인증번호 전송
                </Button>
              </div>
            }
          />

          <Button
            type="submit"
            className={`w-full ${
              timer === 0
                ? 'bg-[color:var(--aiortho-primary)] hover:bg-[color:var(--aiortho-primary)]'
                : 'bg-[color:var(--aiortho-disabled)] hover:bg-[color:var(--aiortho-disabled)]'
            } text-white py-5 mt-4 cursor-pointer rounded-full`}
          >
            다음
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
