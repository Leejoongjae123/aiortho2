import { useState } from 'react';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  useNurseProfile,
  useDoctorProfile,
  useNurseVerifyProfile,
  useDoctorVerifyProfile,
} from '@/hooks';
import { isDoctorRole } from '@/lib/utils';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, {
      message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
    })
    .max(16, {
      message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
    }),
});

type FormValues = z.infer<typeof schema>;

interface VerifyProfileProps {
  onClick?: () => void;
}

export default function VerifyProfile({ onClick }: VerifyProfileProps) {
  const { auth } = useAuthStore();
  if (!auth) return null;

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const profileQuery = isDoctorRole(auth.role) ? useDoctorProfile() : useNurseProfile();
  const verifyProfileMutation = isDoctorRole(auth.role)
    ? useDoctorVerifyProfile()
    : useNurseVerifyProfile();

  const { name, email } = profileQuery.data || {};
  const { mutate: postVerifyProfile, isPending } = verifyProfileMutation;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email,
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    postVerifyProfile(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          onClick?.();
        },
        onError: error => {
          if (error.statusSubCode === 4028) {
            setError('password', { message: '비밀번호가 일치하지 않습니다.' });
          } else {
            toast.error('잠시 후 시도해주세요.');
          }
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!profileQuery.data) return null;

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-[var(--aiortho-gray-900)] mb-5">회원정보 확인</h1>
      <h2 className=" text-[var(--aiortho-gray-600)] mb-13">
        {name}님의 정보를 안전하게 보호하기 위해 비밀번호를 확인합니다.
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <OrthoInput
          label="아이디 (이메일)"
          registration={register('email')}
          error={errors.email?.message}
          readOnly
        />

        <OrthoInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type={showPassword ? 'text' : 'password'}
          registration={register('password')}
          error={errors.password?.message}
          rightIcon={
            showPassword ? (
              <EyeOff size={24} className="text-[var(--aiortho-gray-400)]" />
            ) : (
              <Eye size={24} className="text-[var(--aiortho-gray-400)]" />
            )
          }
          onRightIconClick={togglePasswordVisibility}
          required
        />

        <div className="flex gap-5 mt-4">
          <Button
            className="flex-1 rounded-full h-12 cursor-pointer"
            variant="secondary"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button className="flex-1 rounded-full h-12 cursor-pointer" disabled={isPending}>
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
