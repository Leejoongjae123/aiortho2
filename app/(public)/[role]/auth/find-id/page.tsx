'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/underline-tabs';
import { useFindId } from '../hooks/useFindId';

const findIdSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: z.string().min(9, '9자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
});

const findPasswordSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email({ message: '올바르지 않은 아이디 (이메일) 형식이에요.' }),
  phoneNumber: z.string().min(9, '9자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
});

type FormIdValues = z.infer<typeof findIdSchema>;
type FormPasswordValues = z.infer<typeof findPasswordSchema>;

const AuthFindId = () => {
  const router = useRouter();
  const { role } = useParams();
  const { mutate: postFindId } = useFindId();

  const {
    register: registerId,
    handleSubmit: handleSubmitId,
    formState: { errors: errorsId, isValid: isIdFormValid },
    setError,
  } = useForm<FormIdValues>({
    resolver: zodResolver(findIdSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
    mode: 'onChange',
  });
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isValid: isPasswordFormValid },
  } = useForm<FormPasswordValues>({
    resolver: zodResolver(findPasswordSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmitId: SubmitHandler<FormIdValues> = data => {
    postFindId(data, {
      onSuccess: () => {
        router.push(`/${role}/auth/otp`);
      },
      onError: () => {
        setError('name', {
          type: 'manual',
          message: '가입되지 않은 이름입니다.',
        });
        setError('phoneNumber', {
          type: 'manual',
          message: '가입되지 않은 휴대폰 번호입니다.',
        });
      },
    });
  };

  const onSubmitPassword: SubmitHandler<FormPasswordValues> = data => {
    console.log(data);
    router.push('/doctor/auth/otp');
  };

  return (
    <div className="flex flex-col items-center pt-10 bg-white w-full h-full justify-center px-4 md:px-7">
      <div className="w-full max-w-[540px] mx-auto">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">계정정보 찾기</h1>
          <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
            계정정보를 찾기 위해 아래 항목을 입력해주세요.
          </p>
        </div>

        <Tabs defaultValue="아이디 찾기" className="w-full mt-10">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger className="aiortho-tabs" value="아이디 찾기">
              아이디 찾기
            </TabsTrigger>
            <TabsTrigger className="aiortho-tabs" value="비밀번호 찾기">
              비밀번호 찾기
            </TabsTrigger>
          </TabsList>
          <TabsContent value="아이디 찾기">
            <form onSubmit={handleSubmitId(onSubmitId)} className="space-y-10 mt-8">
              <OrthoInput
                label="이름"
                placeholder="이름을 입력해주세요"
                registration={registerId('name')}
                error={errorsId.name?.message}
              />

              <OrthoInput
                label="휴대폰 번호"
                placeholder="휴대폰 번호을 입력해주세요"
                registration={registerId('phoneNumber')}
                error={errorsId.phoneNumber?.message}
              />

              <Button
                type="submit"
                className={
                  'w-full py-5 mt-4 rounded-full cursor-pointer h-12 bg-[#0054A6] hover:bg-[#0054A6] text-white disabled:bg-[#BDD5FF]'
                }
                disabled={!isIdFormValid}
              >
                다음
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="비밀번호 찾기">
            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              className="space-y-5 md:space-y-10 mt-4"
            >
              <OrthoInput
                label="이름"
                placeholder="이름을 입력해주세요"
                registration={registerPassword('name')}
                error={errorsPassword.name?.message}
              />

              <OrthoInput
                label="아이디 (이메일)"
                placeholder="아이디 (이메일)를 입력해주세요"
                registration={registerPassword('email')}
                error={errorsPassword.name?.message}
              />

              <OrthoInput
                label="휴대폰 번호"
                placeholder="휴대폰 번호을 입력해주세요"
                registration={registerPassword('phoneNumber')}
                error={errorsPassword.phoneNumber?.message}
              />

              <Button
                type="submit"
                className={
                  'w-full py-5 mt-4 md:mb-16 rounded-full cursor-pointer h-12 bg-[#0054A6] hover:bg-[#0054A6] text-white disabled:bg-[#BDD5FF]'
                }
                disabled={!isPasswordFormValid}
              >
                다음
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthFindId;
