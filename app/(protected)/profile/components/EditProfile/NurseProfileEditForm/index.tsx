import { z } from 'zod';
import { useForm } from 'react-hook-form';
import OrthoInput from '@/components/OrthoInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Hospital, Nurse } from '@/models';
import { useState } from 'react';
import { usePhoneVerifyCheck } from '@/hooks/usePhoneVerifyCheck';
import { usePhoneVerifySend } from '@/hooks/usePhoneVerifySend';
import { useTimer } from '@/hooks/useTimer';
import { useUpdateNurseProfile } from '@/hooks/useUpdateNurseProfile';
import { Eye, EyeOff } from 'lucide-react';
import MedicalInstitutionSelector from '@/components/MedicalInstitutionSelector';
import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/utils';
import router from 'next/router';
import { showSuccessToast } from '@/components/ui/toast-notification';

const schema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .optional()
      .refine(
        value => {
          if (!value) return true; // required 체크
          if (value.length < 8 || value.length > 16) return false;
          return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value);
        },
        {
          message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
        }
      ),
    nextPassword: z
      .string()
      .optional()
      .refine(
        value => {
          if (!value) return true; // required 체크
          if (value.length < 8 || value.length > 16) return false;
          return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value);
        },
        {
          message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
        }
      ),
    nextPasswordConfirm: z
      .string()
      .optional()
      .refine(
        value => {
          if (!value) return true; // required 체크
          if (value.length < 8 || value.length > 16) return false;
          return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value);
        },
        {
          message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
        }
      ),
    name: z
      .string()
      .min(2, { message: '이름은 2자 이상 입력해주세요' })
      .max(10, { message: '이름은 10자 이하로 입력해주세요' })
      .regex(/^[가-힣]+$/, { message: '한글만 입력 가능합니다' })
      .refine(
        val => {
          const singleConsonantVowel = /[ㄱ-ㅎㅏ-ㅣ]/;
          return !singleConsonantVowel.test(val);
        },
        { message: '자음이나 모음만 사용할 수 없습니다' }
      ),
    medicalInstitution: z.string().min(1, { message: '의료 기관명을 선택해주세요' }),
    phoneNumber: z.string().min(10, '10자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
    certificationNumber: z.string(),
    certificationNumberCheckStatus: z
      .boolean()
      .refine(val => val === true, { message: '인증번호 확인이 필요합니다.' }),
  })
  .refine(
    data => {
      if (data.certificationNumberCheckStatus === false) {
        if (!data.certificationNumber || data.certificationNumber.length < 6) {
          return false;
        }
        if (data.certificationNumber.length > 6) {
          return false;
        }
      }
      return true;
    },
    {
      message: '6자리로 입력해주세요',
      path: ['certificationNumber'],
    }
  );

type FormValues = z.infer<typeof schema>;

interface NurseProfileEditFormProps {
  profile: Nurse;
}

export default function NurseProfileEditForm({ profile }: NurseProfileEditFormProps) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    setError,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      email: profile.email,
      password: '',
      nextPassword: '',
      nextPasswordConfirm: '',
      name: '',
      medicalInstitution: '',
      phoneNumber: profile.phoneNumber,
      certificationNumber: '',
      certificationNumberCheckStatus: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNextPassword, setShowNextPassword] = useState(false);
  const [showNextPasswordConfirm, setShowNextPasswordConfirm] = useState(false);

  const phoneNumber = watch('phoneNumber');
  const [isPhoneReset, setIsPhoneReset] = useState(false);

  const [certSent, setCertSent] = useState(false);
  const certificationNumber = watch('certificationNumber');
  const certificationNumberCheckStatus = watch('certificationNumberCheckStatus');

  const phoneVerifySendMutation = usePhoneVerifySend();
  const phoneVerifyCheckMutation = usePhoneVerifyCheck();

  const { mutate: phoneVerifySend, isPending: isPhoneVerifySendPending } = phoneVerifySendMutation;
  const { mutate: phoneVerifyCheck, isPending: isPhoneVerifyCheckPending } =
    phoneVerifyCheckMutation;
  const { mutate: updateNurseProfile, isPending: isUpdateNurseProfilePending } =
    useUpdateNurseProfile();

  const DEFAULT_TIMER = 300;
  const { timer, isActive, setTimer, setIsActive } = useTimer();

  const onSubmit = (data: FormValues) => {
    const payload = {
      password: data.nextPassword,
      name: data.name,
      phoneNumber: data.phoneNumber,
      hospitalCode: data.medicalInstitution,
    };

    updateNurseProfile(payload, {
      onSuccess: () => {
        showSuccessToast('개인정보 수정완료', '개인정보가 수정되었어요');
        router.push('/profile');
      },
    });
  };

  const togglePasswordVisibility = (value: 'current' | 'next' | 'nextConfirm') => {
    if (value === 'current') setShowPassword(!showPassword);
    if (value === 'next') setShowNextPassword(!showNextPassword);
    if (value === 'nextConfirm') setShowNextPasswordConfirm(!showNextPasswordConfirm);
  };

  const handleMedicalInstitutionChange = (institution?: Hospital) => {
    setValue('medicalInstitution', institution?.hospitalCode ?? '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handlePhoneNumberCheck = () => {
    phoneVerifySend(
      { phoneNumber },
      {
        onSuccess: () => {
          setCertSent(true);
          setTimer(DEFAULT_TIMER);
          setIsActive(true);
        },
        onError: error => {
          if (error.statusCode === 4002) {
            setError('phoneNumber', { message: '유효하지 않은 전화번호입니다' });
          } else if (error.statusSubCode === 4017) {
            setError('phoneNumber', { message: '인증 시도 횟수를 초과했습니다' });
          } else {
            setError('phoneNumber', { message: '잠시 후 시도해주세요' });
          }
        },
      }
    );
  };

  const handlePhoneNumberReset = () => {
    setValue('phoneNumber', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('certificationNumber', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('certificationNumberCheckStatus', false, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setIsPhoneReset(true);
  };

  const handleCertificationNumberCheck = () => {
    phoneVerifyCheck(
      { phoneNumber, code: certificationNumber },
      {
        onSuccess: () => {
          setValue('certificationNumberCheckStatus', true, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
          setIsActive(false);
          setTimer(DEFAULT_TIMER);
          setIsPhoneReset(false);
        },
        onError: error => {
          if (error.statusCode === 4002) {
            setError('certificationNumber', { message: '유효하지 않은 전화번호입니다' });
          } else {
            setError('certificationNumber', { message: '유효하지 않은 인증 코드입니다' });
          }

          setValue('certificationNumberCheckStatus', false, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className="flex flex-col gap-6"
    >
      <OrthoInput
        label="아이디 (이메일)"
        registration={register('email')}
        error={errors.email?.message}
        isDirty={dirtyFields.email}
        readOnly
      />

      <OrthoInput
        label="현재 비밀번호"
        placeholder="현재 비밀번호를 입력하세요"
        type={showPassword ? 'text' : 'password'}
        registration={register('password')}
        error={errors.password?.message}
        isDirty={dirtyFields.password}
        rightIcon={
          showPassword ? (
            <EyeOff size={20} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          ) : (
            <Eye size={20} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          )
        }
        onRightIconClick={() => togglePasswordVisibility('current')}
      />

      <OrthoInput
        label="변경할 비밀번호"
        placeholder="변경할 비밀번호를 입력하세요"
        type={showNextPassword ? 'text' : 'password'}
        registration={register('nextPassword')}
        error={errors.nextPassword?.message}
        isDirty={dirtyFields.nextPassword}
        rightIcon={
          showNextPassword ? (
            <EyeOff size={20} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          ) : (
            <Eye size={20} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          )
        }
        onRightIconClick={() => togglePasswordVisibility('next')}
      />

      <OrthoInput
        label="변경할 비밀번호 재입력"
        placeholder="변경할 비밀번호를 한 번 더 입력해주세요"
        type={showNextPasswordConfirm ? 'text' : 'password'}
        registration={register('nextPasswordConfirm')}
        error={errors.nextPasswordConfirm?.message}
        apiResponseMessage={
          dirtyFields.nextPasswordConfirm &&
          !errors.password &&
          !errors.nextPassword &&
          !errors.nextPasswordConfirm
            ? '변경할 비밀번호와 일치해요'
            : undefined
        }
        isDirty={dirtyFields.nextPasswordConfirm}
        rightIcon={
          showNextPasswordConfirm ? (
            <EyeOff size={20} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          ) : (
            <Eye size={20} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          )
        }
        onRightIconClick={() => togglePasswordVisibility('nextConfirm')}
      />

      <OrthoInput
        label="이름"
        placeholder="이름을 입력하세요"
        registration={register('name')}
        error={errors.name?.message}
        isDirty={dirtyFields.name}
        required
      />

      <MedicalInstitutionSelector
        label="의료 기관명"
        registration={register('medicalInstitution')}
        error={errors.medicalInstitution?.message}
        onChange={handleMedicalInstitutionChange}
        required
      />

      <OrthoInput
        label="휴대폰 번호"
        placeholder="휴대폰 번호을 입력해주세요"
        registration={register('phoneNumber')}
        error={errors.phoneNumber?.message}
        isDirty={dirtyFields.phoneNumber}
        rightIcon={
          isPhoneReset ? (
            <Button
              type="button"
              onClick={handlePhoneNumberCheck}
              className="text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer"
              disabled={Boolean(errors.phoneNumber) || isPhoneVerifySendPending || isActive}
            >
              인증번호 전송
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handlePhoneNumberReset}
              className="text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer"
            >
              다른번호 변경
            </Button>
          )
        }
        readOnly={!isPhoneReset || isActive}
        required
      />

      {isPhoneReset && (
        <OrthoInput
          label="인증 번호"
          placeholder="인증번호 6자리"
          registration={register('certificationNumber')}
          apiResponse={
            certificationNumberCheckStatus !== null && certificationNumberCheckStatus
              ? !certificationNumberCheckStatus
              : undefined
          }
          apiResponseMessage={
            certificationNumberCheckStatus === true ? '인증 번호가 확인되었어요' : ''
          }
          error={errors.certificationNumber?.message}
          rightIcon={
            <div className="flex items-center gap-2 md:gap-5 py-2">
              {certSent && (
                <p className="text-sm font-normal text-[color:var(--aiortho-gray-400)]">
                  {formatTime(timer)}
                </p>
              )}
              <Button
                type="button"
                onClick={handleCertificationNumberCheck}
                disabled={
                  Boolean(errors.certificationNumber) ||
                  !certSent ||
                  !isActive ||
                  isPhoneVerifyCheckPending
                }
                className={`text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer`}
              >
                확인
              </Button>
            </div>
          }
          readOnly={!isActive}
          required
        />
      )}

      <div className="flex gap-5">
        <Button
          type="button"
          variant="secondary"
          className="flex-1 h-12 rounded-full cursor-pointer"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type="submit"
          className="flex-1 h-12 rounded-full cursor-pointer"
          disabled={isUpdateNurseProfilePending || !isDirty || !isValid}
        >
          수정 완료
        </Button>
      </div>
    </form>
  );
}
