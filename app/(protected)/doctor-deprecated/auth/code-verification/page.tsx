'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';

// Define schema with Zod
const codeVerificationSchema = z.object({
  code: z.string().min(8, '가입코드 8자리를 입력해주세요').max(8, '가입코드 8자리를 입력해주세요'),
});

type FormValues = z.infer<typeof codeVerificationSchema>;

const CodeVerificationPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(codeVerificationSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
  });

  const codeValue = watch('code');
  const isCodeValid = codeValue && codeValue.length === 8;

  const onSubmit = (data: FormValues) => {
    // 코드 검증 로직을 여기에 추가할 수 있습니다
    router.push('/doctor/auth/join-membership');
  };

  return (
    <div className="flex flex-col items-center bg-white w-full justify-start h-full pt-[10vh]">
      {/* Breadcrumb navigation */}

      {/* Main content */}
      <div className="w-full max-w-[540px] pt-[100px] md:pt-10 sm:pt-5">
        <h1 className="text-[32px] font-bold text-[#161621] leading-10 mb-5 md:text-[28px] md:leading-9 sm:text-[24px] sm:leading-8">
          의사 가입 코드 인증
        </h1>
        <p className="text-[17px] font-normal text-[#66798D] leading-[22px] mb-[72px] md:mb-10 sm:mb-8 md:text-base sm:text-[15px]">
          발급받은 의사 가입 코드 번호를 입력해 주세요
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="space-y-6">
            <OrthoInput
              label="의사 가입 코드"
              placeholder="가입코드 8자리"
              registration={register('code')}
              error={errors.code?.message}
            />
          </div>

          <div className="flex justify-end mt-18 mb-12">
            <Button
              type="submit"
              className={`w-full rounded-full py-3.5 text-white text-sm font-bold h-12 ${
                isCodeValid
                  ? 'bg-[#0054A6] hover:bg-[#0054A6]'
                  : 'bg-[#BDD5FF] hover:bg-[#BDD5FF] cursor-not-allowed'
              }`}
              disabled={!isCodeValid}
            >
              다음
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeVerificationPage;
