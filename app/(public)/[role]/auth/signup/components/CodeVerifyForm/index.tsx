'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import useDoctorSignupActivateCode from '../../hooks/useDoctorSignupActivateCode';
import Spinner from '@/components/Spinner';
import { showSuccessToast } from '@/components/ui/toast-notification';

// Define schema with Zod
const codeVerificationSchema = z.object({
  code: z.string().min(8, '가입코드 8자리를 입력해주세요').max(8, '가입코드 8자리를 입력해주세요'),
});

type FormValues = z.infer<typeof codeVerificationSchema>;

interface CodeVerifyFormProps {
  onSubmit?: (token: string) => void;
}

const CodeVerifyForm = ({ onSubmit }: CodeVerifyFormProps) => {
  const router = useRouter();
  const { role } = useParams();
  const doctorSignupActivateCodeMutation = useDoctorSignupActivateCode();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(codeVerificationSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
  });

  const onSubmitCodeVerifyForm = (data: FormValues) => {
    doctorSignupActivateCodeMutation.mutate(
      {
        code: data.code,
      },
      {
        onSuccess: ({ signupToken }) => {
          onSubmit && onSubmit(signupToken);
          showSuccessToast('가입 코드 인증 완료', '의사 가입 코드 인증이 완료되었습니다.');
        },
        onError: () => {
          setError('code', { message: '유효하지 않은 코드 입니다.' });
        },
      }
    );
  };

  if (role !== 'doctor') {
    router.replace('/');
    return null;
  }

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

        <form onSubmit={handleSubmit(onSubmitCodeVerifyForm)} className="w-full space-y-6">
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
              className="w-full rounded-full py-3.5 text-white text-sm font-bold h-12 cursor-pointer"
              disabled={!isValid}
            >
              {doctorSignupActivateCodeMutation.isPending ? <Spinner /> : '다음'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeVerifyForm;
