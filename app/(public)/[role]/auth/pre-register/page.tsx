'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { showSuccessToast } from '@/components/ui/toast-notification';

// Define schema with Zod
const preRegisterSchema = z.object({
  phoneNumber: z.string().min(9, '9자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
  email: z.string().email({ message: '올바르지 않은 이메일 형식이에요.' }),
  hospitalName: z.string().min(1, { message: '병원명을 입력해주세요' }),
  hospitalAddress: z.string().min(1, { message: '병원 주소를 입력해주세요' }),
  hospitalPhone: z.string().min(9, '9자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
});

type FormValues = z.infer<typeof preRegisterSchema>;

const PreRegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(preRegisterSchema),
    defaultValues: {
      phoneNumber: '',
      email: '',
      hospitalName: '',
      hospitalAddress: '',
      hospitalPhone: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => {
    // 등록 신청 완료 토스트 표시
    showSuccessToast('등록 신청 완료', '병원 정보 등록 신청이 완료되었습니다.');

    // 홈페이지로 이동
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center bg-white w-full justify-center h-full ">
      {/* Main content */}
      <div className="w-full max-w-[540px] pt-[100px] md:pt-10 sm:pt-5">
        <h1 className="text-[32px] font-bold text-[#161621] leading-10 mb-5 md:text-[28px] md:leading-9 sm:text-[24px] sm:leading-8">
          병원 사전 등록
        </h1>
        <p className="text-[17px] font-normal text-[#66798D] leading-[22px] mb-[72px] md:mb-10 sm:mb-8 md:text-base sm:text-[15px]">
          병원 사전 등록을 위해 아래 항목들을 입력해주세요.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="space-y-6">
            <OrthoInput
              label="휴대폰 번호"
              placeholder="휴대폰 번호을 입력해주세요"
              registration={register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />

            <OrthoInput
              label="이메일"
              placeholder="이메일을 입력해주세요"
              registration={register('email')}
              error={errors.email?.message}
            />

            <OrthoInput
              label="병원명"
              placeholder="병원명을 입력해주세요"
              registration={register('hospitalName')}
              error={errors.hospitalName?.message}
            />

            <OrthoInput
              label="병원 주소"
              placeholder="병원 주소를 입력해주세요"
              registration={register('hospitalAddress')}
              error={errors.hospitalAddress?.message}
            />

            <OrthoInput
              label="병원 대표전화"
              placeholder="병원 대표전화 번호를 입력해주세요"
              registration={register('hospitalPhone')}
              error={errors.hospitalPhone?.message}
            />
          </div>

          <div className="flex mb-12 ">
            <Button
              type="submit"
              className="w-full rounded-full py-3.5 text-white text-sm font-bold h-12 cursor-pointer"
              disabled={!isValid}
            >
              등록 신청
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreRegisterPage;
