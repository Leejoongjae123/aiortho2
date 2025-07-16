import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFindId } from '../hooks/useFindId';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthFindIdFormValues } from '../types';

const findIdSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: z.string().min(10, '10자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
});

type FormIdValues = z.infer<typeof findIdSchema>;

interface AuthFindIdFormProps {
  onSubmit?: (data: AuthFindIdFormValues) => void;
}

export default function AuthFindIdForm({ onSubmit }: AuthFindIdFormProps) {
  const postFindIdMutation = useFindId();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<FormIdValues>({
    resolver: zodResolver(findIdSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });

  const onSubmitId: SubmitHandler<FormIdValues> = data => {
    postFindIdMutation.mutate(data, {
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
            message: '존재하지 않는 사용자입니다',
          });

          return;
        }

        toast.error('서버 에러가 발생했습니다', {
          description: '잠시 후 다시 시도해주세요',
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitId)} className="space-y-10 mt-8">
      <OrthoInput
        label="이름"
        placeholder="이름을 입력해주세요"
        registration={register('name')}
        error={errors.name?.message}
      />

      <OrthoInput
        label="휴대폰 번호"
        placeholder="휴대폰 번호을 입력해주세요 (01012345678)"
        registration={register('phoneNumber')}
        error={errors.phoneNumber?.message}
      />

      <Button
        type="submit"
        className="w-full py-5 mt-4 rounded-full cursor-pointer h-12 text-white"
        disabled={!isValid || postFindIdMutation.isPending}
      >
        {postFindIdMutation.isPending ? <Spinner /> : '다음'}
      </Button>
    </form>
  );
}
