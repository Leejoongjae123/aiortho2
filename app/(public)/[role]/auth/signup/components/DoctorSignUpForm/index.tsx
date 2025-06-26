import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useCheckEmail } from '../../hooks';
import MedicalInstitutionSelector from '@/components/MedicalInstitutionSelector';
import { ArrayItem } from '@/components/ui/multi-column-dropdown';
import MedicalDepartmentSelector from '@/components/MedicalDepartmentSelector';
import NurseManagerSelector from '@/components/NurseManagerSelector';
import SignupCheckList from '../SignupCheckList';
import { formatTime } from '@/lib/utils';
import { usePhoneVerifySend } from '@/hooks';
import { useTimer } from '@/hooks/useTimer';

interface DoctorSignupFormProps {
  token: string;
}

const schema = z
  .object({
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
    name: z.string().min(1, { message: '이름을 입력해주세요' }),
    medicalLicense: z.string(),
    specialistLicense: z.string(),
    doctorCode: z.string(),
    phoneNumber: z.string().min(9, '9자리 이상 입력해주세요').max(11, '11자리 이하 입력해주세요'),
    certificationNumber: z
      .string()
      .min(6, '6자리 이상 입력해주세요')
      .max(6, '6자리 이하 입력해주세요'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type FormValues = z.infer<typeof schema>;

const SPECIALTIES = [
  [
    { id: '1', name: '재활의학과' },
    { id: '2', name: '소아청소년과' },
    { id: '3', name: '가정의학과' },
    { id: '4', name: '정형외과' },
  ],
  [
    { id: '5', name: '성형외과' },
    { id: '6', name: '일반의' },
    { id: '7', name: '결핵과' },
    { id: '8', name: '내과' },
  ],
  [
    { id: '9', name: '마취통증의학과' },
    { id: '10', name: '방사선종양학과' },
    { id: '11', name: '병리과' },
    { id: '12', name: '비뇨의학과' },
  ],
  [
    { id: '13', name: '산부인과' },
    { id: '14', name: '신경과' },
    { id: '15', name: '신경외과' },
    { id: '16', name: '안과' },
  ],
  [
    { id: '17', name: '영상의학과' },
    { id: '18', name: '예방의학과' },
    { id: '19', name: '외과' },
    { id: '20', name: '응급의학과' },
  ],
  [
    { id: '21', name: '이비인후과' },
    { id: '22', name: '진단검사의학과' },
    { id: '23', name: '피부과' },
    { id: '24', name: '핵의학과' },
  ],
  [
    { id: '25', name: '흉부외과' },
    { id: '26', name: '치과' },
    { id: '27', name: '한의학과' },
    { id: '28', name: '정신건강의학과' },
  ],
  [
    { id: '29', name: '감염내과' },
    { id: '30', name: '알레르기내과' },
    { id: '31', name: '류마티스내과' },
    { id: '32', name: '노년내과' },
  ],
];

const DoctorSignUpForm = ({ token }: DoctorSignupFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      medicalLicense: '',
      specialistLicense: '',
      // doctorCode: token ,
      doctorCode: 'NDKS8354K',
      phoneNumber: '',
      certificationNumber: '',
    },
  });

  console.log(watch());

  const email = watch('email');
  const [prevEmail, setPrevEmail] = useState<string>('');
  const [emailCheckStatus, setEmailCheckStatus] = useState<null | boolean>(null);
  const emailCheckMutation = useCheckEmail();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [departmentDropDownIsOpen, setDepartmentDropDownIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<ArrayItem | null>(null);

  const [specialistDropDownIsOpen, setSpecialistDropDownIsOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<ArrayItem | null>(null);

  const phoneNumber = watch('phoneNumber');
  const [phoneNumberCheckStatus, setPhoneNumberCheckStatus] = useState<null | boolean>(null);
  const phoneVerifyMutation = usePhoneVerifySend();

  const { timer, isActive, setTimer, setIsActive } = useTimer();
  const [certificationNumberCheckStatus, setCertificationNumberCheckStatus] = useState<
    null | boolean
  >(null);

  const DEFAULT_TIMER = 180; // 3 minutes in seconds
  const [certSent, setCertSent] = useState(false);
  const certificationNumber = watch('certificationNumber');
  const mockCertificationCode = '123456'; // Mock verification code

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
            setError('email', { message: '이미 가입된 이메일입니다.' });
          }

          setEmailCheckStatus(false);
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePhoneNumberCheck = () => {
    // if (mockPhoneNumber.includes(phoneNumber)) {
    //   setPhoneNumberCheckStatus(false);
    // } else {
    //   setPhoneNumberCheckStatus(true);
    //   if (phoneNumber) {
    //     setCertSent(true);
    //     setTimer(DEFAULT_TIMER);
    //     setIsActive(true);
    //   }
    // }

    phoneVerifyMutation.mutate(
      { phoneNumber },
      {
        onSuccess: () => {
          setPhoneNumberCheckStatus(true);
          setCertSent(true);
          setTimer(DEFAULT_TIMER);
          setIsActive(true);
        },
        onError: error => {
          console.log(error);
          setPhoneNumberCheckStatus(false);
        },
      }
    );
  };

  const handleCertificationNumberCheck = () => {
    if (certificationNumber === mockCertificationCode) {
      // Certification number matches
      setCertificationNumberCheckStatus(true);
      setIsActive(false); // Stop the timer once verified
    } else {
      // Certification number doesn't match
      setCertificationNumberCheckStatus(false);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted with data:', data);
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
          <OrthoInput label="의사 가입 코드" registration={register('doctorCode')} readOnly />

          <OrthoInput
            label="아이디 (이메일)"
            placeholder="아이디 (이메일)를 입력해주세요"
            registration={register('email')}
            apiResponse={emailCheckStatus !== null ? !emailCheckStatus : undefined}
            apiResponseMessage={emailCheckStatus ? '사용가능한 아이디 (이메일)에요.' : undefined}
            error={errors.email?.message}
            rightIcon={
              <Button
                type="button"
                onClick={() => handleEmailCheck(email)}
                className="text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer"
                disabled={emailCheckStatus === true || Boolean(errors.email) || prevEmail === email}
              >
                중복확인
              </Button>
            }
            readOnly={emailCheckMutation.isSuccess}
            required
          />

          <OrthoInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            type={showPassword ? 'text' : 'password'}
            registration={register('password')}
            error={errors.password?.message}
            required
            rightIcon={
              showPassword ? (
                <EyeOff size={20} color="#97A8C4" />
              ) : (
                <Eye size={20} color="#97A8C4" />
              )
            }
            onRightIconClick={togglePasswordVisibility}
          />

          <OrthoInput
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            type={showConfirmPassword ? 'text' : 'password'}
            registration={register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
            rightIcon={
              showConfirmPassword ? (
                <EyeOff size={20} color="#97A8C4" />
              ) : (
                <Eye size={20} color="#97A8C4" />
              )
            }
            onRightIconClick={toggleConfirmPasswordVisibility}
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
            required
          />

          <MedicalInstitutionSelector label="의료 기관명" required />

          {/* Department Dropdown */}
          <MedicalDepartmentSelector />

          {/* FIXME: 기획 고도화 필요 */}
          {/* <div className="relative">
            <div onClick={() => toggleDropdown('specialist')} className="cursor-pointer">
              <OrthoInput
                label="전문의 과목"
                value={selectedSpecialist?.name}
                placeholder="전문의 과목을 선택해주세요"
                rightIcon={<ChevronDown size={20} color="#97A8C4" />}
              />
            </div>

            <MultiColumnDropdown
              isOpen={specialistDropDownIsOpen}
              onClose={() => setSpecialistDropDownIsOpen(false)}
              onSelect={handleSpecialistSelect}
              className="mt-3"
              items={[]}
              width="w-full"
            />
          </div> */}

          <OrthoInput
            label="전문의 면허 번호"
            placeholder="전문의 면허 번호을 입력해주세요"
            registration={register('specialistLicense')}
            error={errors.specialistLicense?.message}
          />

          {/* FIXME: 기획 고도화 필요 */}
          <NurseManagerSelector label="담당 간호사" />

          <OrthoInput
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해주세요"
            registration={register('phoneNumber')}
            apiResponse={phoneNumberCheckStatus !== null ? !phoneNumberCheckStatus : undefined}
            apiResponseMessage={
              phoneNumberCheckStatus === true
                ? '사용 가능한 전화번호입니다.'
                : phoneNumberCheckStatus === false
                  ? '이미 사용 중인 전화번호입니다.'
                  : undefined
            }
            error={errors.phoneNumber?.message}
            rightIcon={
              <div className="flex items-center gap-2 md:gap-5 py-2">
                <Button
                  type="button"
                  onClick={handlePhoneNumberCheck}
                  className="text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer"
                  disabled={
                    phoneVerifyMutation.isPending ||
                    phoneVerifyMutation.isError ||
                    Boolean(errors.phoneNumber)
                  }
                >
                  인증번호 전송
                </Button>
              </div>
            }
            required
          />

          <OrthoInput
            label="인증 번호"
            placeholder="인증번호 6자리"
            registration={register('certificationNumber')}
            apiResponse={
              certificationNumberCheckStatus !== null ? !certificationNumberCheckStatus : undefined
            }
            apiResponseMessage={
              certificationNumberCheckStatus === true
                ? '인증 번호가 일치해요.'
                : certificationNumberCheckStatus === false
                  ? '인증 번호가 일치하지 않아요.'
                  : undefined
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
                  // disabled={!certSent || !isActive}
                  className={`text-white bg-[#8395AC] hover:bg-[#8395AC] rounded-md h-8 font-medium text-[13px]`}
                >
                  확인
                </Button>
              </div>
            }
            required
          />

          <SignupCheckList />

          <Button
            type="submit"
            className="w-full bg-[color:var(--aiortho-primary)] hover:bg-[color:var(--aiortho-primary)] text-white py-5 mt-4 md:mb-16 rounded-full cursor-pointer"
          >
            다음
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignUpForm;
