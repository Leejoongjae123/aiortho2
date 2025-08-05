import { useState, useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useCheckEmail } from '../../hooks';
import MedicalInstitutionSelector from '@/components/MedicalInstitutionSelector';
import MedicalDepartmentSelector from '@/components/MedicalDepartmentSelector';
import NurseManagerSelector from '@/components/NurseManagerSelector';
import SignupCheckList from '../SignupCheckList';
import { formatTime } from '@/lib/utils';
import { useTimer } from '@/hooks/useTimer';
import { decodeJWT } from '@/lib/utils';
import { Hospital, MedicalDepartment } from '@/models';
import { useMedicalDepartments } from '@/hooks';
import { useDoctorSignUp } from '../../hooks/useDoctorSignUp';
import { useRouter } from 'next/navigation';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { toast } from 'sonner';
import { useMedicalLicenseCheck, usePhoneVerifyCheck, usePhoneVerifySend } from '@/hooks';

const schema = z
  .object({
    signupCode: z.string(),
    email: z.string().email({ message: '올바르지 않은 아이디 (이메일) 형식이에요.' }),
    password: z
      .string()
      .min(8, {
        message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
      })
      .max(16, {
        message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.',
      })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: '영문, 숫자, 특수문자를 모두 포함해야 합니다.',
      }),
    confirmPassword: z.string(),
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
    medicalLicense: z
      .string()
      .min(5, { message: '의사 면허 번호 숫자 5자리를 입력해주세요' })
      .max(5, { message: '의사 면허 번호 숫자 5자리를 입력해주세요' }),
    medicalInstitution: z.string().min(1, { message: '의료 기관명을 선택해주세요' }),
    medicalDepartment: z.string().min(1, { message: '진료과를 선택해주세요' }),
    specialties: z.string().optional(),
    specialistLicense: z.string().optional(),
    nurseIds: z
      .array(z.string())
      .refine(val => !val || val.length <= 10, {
        message: '담당 간호사는 최대 10명까지 선택할 수 있습니다.',
      })
      .optional(),
    phoneNumber: z.string().min(10, '10자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
    certificationNumber: z
      .string()
      .min(6, '6자리 이상 입력해주세요')
      .max(6, '6자리 이하 입력해주세요'),
    certificationNumberCheckStatus: z
      .boolean()
      .refine(val => val === true, { message: '인증번호 확인이 필요합니다.' }),
    requiredTermsAgreed: z
      .boolean()
      .refine(val => val === true, { message: '필수 약관에 동의해주세요.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type FormValues = z.infer<typeof schema>;
interface DoctorSignupFormProps {
  signUpToken: string;
}

const DoctorSignUpForm = ({ signUpToken }: DoctorSignupFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      signupCode: decodeJWT(signUpToken).code,
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      medicalLicense: '',
      medicalInstitution: '',
      medicalDepartment: '',
      specialties: '',
      specialistLicense: '',
      nurseIds: [],
      phoneNumber: '',
      certificationNumber: '',
      certificationNumberCheckStatus: false,
      requiredTermsAgreed: false,
    },
  });

  const email = watch('email');
  const [prevEmail, setPrevEmail] = useState<string>('');
  const [emailCheckStatus, setEmailCheckStatus] = useState<null | boolean>(null);
  const emailCheckMutation = useCheckEmail();

  const confirmPassword = watch('confirmPassword');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const medicalLicense = watch('medicalLicense');
  const [prevMedicalLicense, setPrevMedicalLicense] = useState<string>('');
  const [medicalLicenseCheckStatus, setMedicalLicenseCheckStatus] = useState<null | boolean>(null);
  const medicalLicenseCheckMutation = useMedicalLicenseCheck();

  const medicalDepartmentsQuery = useMedicalDepartments();

  const phoneNumber = watch('phoneNumber');
  const [prevPhoneNumber, setPrevPhoneNumber] = useState<string>('');
  const [phoneNumberCheckStatus, setPhoneNumberCheckStatus] = useState<null | boolean>(null);
  const phoneVerifySendMutation = usePhoneVerifySend();

  const phoneVerifyCheckMutation = usePhoneVerifyCheck();
  const [certSent, setCertSent] = useState(false);
  const certificationNumber = watch('certificationNumber');
  const [prevCertificationNumber, setPrevCertificationNumber] = useState<string>('');
  const certificationNumberCheckStatus = watch('certificationNumberCheckStatus');

  const doctorSignUpMutation = useDoctorSignUp(signUpToken);

  const DEFAULT_TIMER = 300;
  const { timer, isActive, setTimer, setIsActive } = useTimer();

  // 선택된 의료기관 이름 관리
  const [selectedInstitutionName, setSelectedInstitutionName] = useState<string>('');
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>('');
  const [selectedSpecialtiesName, setSelectedSpecialtiesName] = useState<string>('');

  // 이메일 입력값 변경 감지
  useEffect(() => {
    if (email !== prevEmail && emailCheckStatus !== null) {
      setEmailCheckStatus(null);
      clearErrors('email');
    }
  }, [email, prevEmail, clearErrors]);

  // 의료 면허 번호 입력값 변경 감지
  useEffect(() => {
    if (medicalLicense !== prevMedicalLicense && medicalLicenseCheckStatus !== null) {
      setMedicalLicenseCheckStatus(null);
      clearErrors('medicalLicense');
    }
  }, [medicalLicense, prevMedicalLicense, medicalLicenseCheckStatus, clearErrors]);

  // 휴대폰 번호 입력값 변경 감지
  useEffect(() => {
    if (phoneNumber !== prevPhoneNumber && phoneNumberCheckStatus !== null) {
      setPhoneNumberCheckStatus(null);
      setCertSent(false);
      setIsActive(false);
      setTimer(DEFAULT_TIMER);
      clearErrors('phoneNumber');
    }
  }, [phoneNumber, prevPhoneNumber, phoneNumberCheckStatus, setIsActive, setTimer, clearErrors]);

  // 인증번호 입력값 변경 감지
  useEffect(() => {
    if (certificationNumber !== prevCertificationNumber && certificationNumberCheckStatus) {
      setValue('certificationNumberCheckStatus', false, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setPrevCertificationNumber('');
      clearErrors('certificationNumber');
    }
  }, [
    certificationNumber,
    prevCertificationNumber,
    certificationNumberCheckStatus,
    setValue,
    clearErrors,
  ]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailCheck = (email: string) => {
    emailCheckMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setPrevEmail(email);
          setEmailCheckStatus(true);
        },
        onError: error => {
          if (error.statusCode === 409) {
            setError('email', { message: '이미 가입된 아이디(이메일)에요' });
          }

          setEmailCheckStatus(false);
        },
      }
    );
  };

  const handleMedicalLicenseCheck = () => {
    medicalLicenseCheckMutation.mutate(
      { licenseNumber: medicalLicense, token: signUpToken },
      {
        onSuccess: () => {
          setPrevMedicalLicense(medicalLicense);
          setMedicalLicenseCheckStatus(true);
        },
        onError: error => {
          if (error.statusCode === 4011) {
            setError('medicalLicense', { message: '이미 사용된 의사 면허 번호에요' });
          } else {
            setError('medicalLicense', { message: '의사 면허 번호를 다시 확인해주세요' });
          }

          setMedicalLicenseCheckStatus(false);
        },
      }
    );
  };

  const handleMedicalInstitutionChange = (institution?: Hospital) => {
    setValue('medicalInstitution', institution?.hospitalCode ?? '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setSelectedInstitutionName(institution?.name ?? '');
  };

  const handleMedicalDepartmentChange = (department?: MedicalDepartment) => {
    setValue('medicalDepartment', department?.code ?? '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setSelectedDepartmentName(department?.name ?? '');
  };

  const handleSpecialtiesChange = (department?: MedicalDepartment) => {
    if (department?.name === '선택 안함') {
      setValue('specialties', '', {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setSelectedSpecialtiesName('');
    } else {
      setValue('specialties', department?.code ?? '', {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setSelectedSpecialtiesName(department?.name ?? '');
    }
  };

  const handleNurseIdsChange = (nurseIds: string[]) => {
    setValue('nurseIds', nurseIds, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handlePhoneNumberCheck = () => {
    phoneVerifySendMutation.mutate(
      { phoneNumber },
      {
        onSuccess: () => {
          setPhoneNumberCheckStatus(true);
          setCertSent(true);
          setTimer(DEFAULT_TIMER);
          setIsActive(true);
          setPrevPhoneNumber(phoneNumber);
        },
        onError: error => {
          if (error.statusCode === 4002) {
            setError('phoneNumber', { message: '유효하지 않은 전화번호입니다' });
          } else if (error.statusSubCode === 4017) {
            setError('phoneNumber', { message: '인증 시도 횟수를 초과했습니다' });
          } else {
            setError('phoneNumber', { message: '잠시 후 시도해주세요' });
          }

          setPhoneNumberCheckStatus(false);
        },
      }
    );
  };

  const handleCertificationNumberCheck = () => {
    phoneVerifyCheckMutation.mutate(
      { phoneNumber, code: certificationNumber },
      {
        onSuccess: () => {
          setPrevCertificationNumber(certificationNumber);
          setValue('certificationNumberCheckStatus', true, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
          setIsActive(false);
          setTimer(DEFAULT_TIMER);
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

  const handleRequiredTermsChange = (isValid: boolean) => {
    setValue('requiredTermsAgreed', isValid, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      signupCode: data.signupCode,
      email: data.email,
      password: data.password,
      name: data.name,
      licenseNumber: data.medicalLicense,
      phoneNumber: data.phoneNumber,
      hospitalCode: data.medicalInstitution,
      departmentCode: data.medicalDepartment,
      ...(data.specialties && { specialtyField: data.specialties }),
      ...(data.specialistLicense && { specialistLicenseNumber: data.specialistLicense }),
      ...(data.nurseIds && { nurseIds: data.nurseIds }),
    };

    doctorSignUpMutation.mutateAsync(payload, {
      onSuccess: () => {
        router.replace('/doctor/auth');
        showSuccessToast('회원가입이 완료되었어요', '로그인 해주세요.');
      },
      onError: () => {
        toast.error('회원가입에 실패했어요.', {
          description: '잠시 후 시도해주세요.',
        });
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center bg-white py-20">
      <div className="w-full max-w-[540px] mx-auto">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">회원가입</h1>
          <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
            회원가입을 위해 아래 항목들을 입력해주세요.
          </p>
        </div>
        <form className="space-y-10 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <OrthoInput label="의사 가입 코드" registration={register('signupCode')} readOnly />

          <OrthoInput
            label="아이디 (이메일)"
            placeholder="아이디 (이메일)를 입력해주세요"
            registration={register('email')}
            apiResponse={emailCheckStatus !== null ? !emailCheckStatus : undefined}
            apiResponseMessage={
              emailCheckStatus && !Boolean(errors.email)
                ? '사용가능한 아이디 (이메일)에요.'
                : undefined
            }
            error={errors.email?.message}
            rightIcon={
              <Button
                type="button"
                onClick={() => handleEmailCheck(email)}
                className="text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer"
                disabled={emailCheckStatus || Boolean(errors.email) || !email}
              >
                중복확인
              </Button>
            }
            required
          />

          <OrthoInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            type={showPassword ? 'text' : 'password'}
            registration={register('password')}
            error={errors.password?.message}
            rightIcon={
              showPassword ? (
                <EyeOff size={20} color="#97A8C4" />
              ) : (
                <Eye size={20} color="#97A8C4" />
              )
            }
            onRightIconClick={togglePasswordVisibility}
            required
          />

          <OrthoInput
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            type={showConfirmPassword ? 'text' : 'password'}
            registration={register('confirmPassword')}
            apiResponseMessage={
              confirmPassword && !errors.confirmPassword ? '비밀번호가 일치해요' : undefined
            }
            error={errors.confirmPassword?.message}
            rightIcon={
              showConfirmPassword ? (
                <EyeOff size={20} color="#97A8C4" />
              ) : (
                <Eye size={20} color="#97A8C4" />
              )
            }
            onRightIconClick={toggleConfirmPasswordVisibility}
            required
          />

          <OrthoInput
            label="이름"
            placeholder="이름을 입력해주세요"
            registration={register('name')}
            error={errors.name?.message}
            required
          />

          <OrthoInput
            label="의료 면허 번호"
            placeholder="의료 면허 번호을 입력해주세요"
            registration={register('medicalLicense')}
            error={errors.medicalLicense?.message}
            apiResponse={
              medicalLicenseCheckStatus !== null ? !medicalLicenseCheckStatus : undefined
            }
            apiResponseMessage={
              medicalLicenseCheckStatus === true ? '사용가능한 의사 면허 번호에요' : ''
            }
            rightIcon={
              <Button
                type="button"
                onClick={() => handleMedicalLicenseCheck()}
                className="text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer"
                disabled={
                  medicalLicenseCheckStatus === true ||
                  Boolean(errors.medicalLicense) ||
                  !medicalLicense
                }
              >
                중복확인
              </Button>
            }
            required
          />

          <MedicalInstitutionSelector
            label="의료 기관명"
            registration={register('medicalInstitution')}
            error={errors.medicalInstitution?.message}
            onChange={handleMedicalInstitutionChange}
            selectedInstitutionName={selectedInstitutionName}
            required
          />

          {/* Department Dropdown */}
          <MedicalDepartmentSelector
            label="진료과"
            placeholder="진료과를 선택해주세요"
            items={medicalDepartmentsQuery.data ?? []}
            registration={register('medicalDepartment')}
            error={errors.medicalDepartment?.message}
            onChange={handleMedicalDepartmentChange}
            selectedDepartmentName={selectedDepartmentName}
            required
          />

          {/* Specialties Dropdown */}
          <MedicalDepartmentSelector
            label="전문의 과목"
            placeholder="전문의 과목을 선택해주세요"
            items={[{ code: 'none', name: '선택 안함' }, ...(medicalDepartmentsQuery.data ?? [])]}
            registration={register('specialties')}
            error={errors.specialties?.message}
            onChange={handleSpecialtiesChange}
            selectedDepartmentName={selectedSpecialtiesName}
          />

          <OrthoInput
            label="전문의 면허 번호"
            placeholder="전문의 면허 번호을 입력해주세요"
            registration={register('specialistLicense')}
            error={errors.specialistLicense?.message}
          />

          <NurseManagerSelector
            label="담당 간호사"
            error={errors.nurseIds?.message}
            onChange={handleNurseIdsChange}
          />

          <OrthoInput
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해주세요"
            registration={register('phoneNumber')}
            apiResponse={phoneNumberCheckStatus !== null ? !phoneNumberCheckStatus : undefined}
            apiResponseMessage={
              phoneNumberCheckStatus === true ? '사용 가능한 전화번호입니다.' : ''
            }
            error={errors.phoneNumber?.message}
            rightIcon={
              <div className="flex items-center gap-2 md:gap-5 py-2">
                <Button
                  type="button"
                  onClick={handlePhoneNumberCheck}
                  className="text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer"
                  disabled={
                    phoneVerifySendMutation.isPending ||
                    phoneVerifySendMutation.isError ||
                    Boolean(errors.phoneNumber) ||
                    !phoneNumber ||
                    isActive
                  }
                >
                  인증번호 전송
                </Button>
              </div>
            }
            readOnly={isActive}
            required
          />

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
                  disabled={!certSent || !isActive}
                  className={`text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer`}
                >
                  확인
                </Button>
              </div>
            }
            readOnly={!isActive}
            required
          />

          <SignupCheckList
            error={errors.requiredTermsAgreed?.message}
            onRequiredTermsChange={handleRequiredTermsChange}
          />

          <Button
            type="submit"
            className="w-full bg-[color:var(--aiortho-primary)] hover:bg-[color:var(--aiortho-primary)] text-white py-5 mt-4 md:mb-16 rounded-full cursor-pointer"
            disabled={!isValid || isSubmitting}
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignUpForm;
