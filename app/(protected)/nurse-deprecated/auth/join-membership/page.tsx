'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import MedicalInstitution from './medical-institution';
import NurseManagerWrapper from './nurse-manager';
import MultiColumnDropdown, { ArrayItem } from '@/components/ui/multi-column-dropdown';
import CheckList from './check-list';

// Define the specialties data
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

const JoinMembership = () => {
  const mockEmail = ['shuvamsantra10@gmail.com'];
  const mockPhoneNumber = ['010234567890'];
  const mockCertificationCode = '123456'; // Mock verification code

  const DEFAULT_TIMER = 180; // 3 minutes in seconds
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [certSent, setCertSent] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      setIsActive(false);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer, isActive]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const [emailCheckStatus, setEmailCheckStatus] = useState<null | boolean>(null);
  const [phoneNumberCheckStatus, setPhoneNumberCheckStatus] = useState<null | boolean>(null);

  const [certificationNumberCheckStatus, setCertificationNumberCheckStatus] = useState<
    null | boolean
  >(null);

  const [showPassword, setShowPassword] = useState(false);
  const [departmentDropDownIsOpen, setDepartmentDropDownIsOpen] = useState(false);
  const [specialistDropDownIsOpen, setSpecialistDropDownIsOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState<ArrayItem | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<ArrayItem | null>(null);

  const handleDepartmentSelect = (department: ArrayItem) => {
    setSelectedDepartment(department);
    setDepartmentDropDownIsOpen(false);
  };

  const handleSpecialistSelect = (specialist: ArrayItem) => {
    setSelectedSpecialist(specialist);
    setSpecialistDropDownIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      medicalLicense: '',
      specialistLicense: '',
      doctorCode: 'NDKS8354K',
      phoneNumber: '',
      certificationNumber: '',
    },
  });

  const email = watch('email');
  const phoneNumber = watch('phoneNumber');
  const certificationNumber = watch('certificationNumber');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailCheck = () => {
    if (mockEmail.includes(email)) {
      // Email exists in database, so it's NOT available
      setEmailCheckStatus(false);
    } else {
      // Email doesn't exist, so it IS available
      setEmailCheckStatus(true);

      // Send verification code and start timer
      if (email) {
        setCertSent(true);
        setTimer(DEFAULT_TIMER);
        setIsActive(true);
      }
    }
  };

  const handlePhoneNumberCheck = () => {
    if (mockPhoneNumber.includes(phoneNumber)) {
      // Phone Number exists in database, so it's NOT available
      setPhoneNumberCheckStatus(false);
    } else {
      // Phone Number doesn't exist, so it IS available
      setPhoneNumberCheckStatus(true);

      // Send verification code and start timer
      if (phoneNumber) {
        setCertSent(true);
        setTimer(DEFAULT_TIMER);
        setIsActive(true);
      }
    }
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

  // Function to close all dropdowns except the one being opened
  const toggleDropdown = (dropdownName: 'department' | 'specialist') => {
    if (dropdownName === 'department') {
      // If opening department, close specialist
      if (!departmentDropDownIsOpen) {
        setSpecialistDropDownIsOpen(false);
      }
      setDepartmentDropDownIsOpen(!departmentDropDownIsOpen);
    } else {
      // If opening specialist, close department
      if (!specialistDropDownIsOpen) {
        setDepartmentDropDownIsOpen(false);
      }
      setSpecialistDropDownIsOpen(!specialistDropDownIsOpen);
    }
  };

  return (
    <div className=" flex flex-col items-center bg-white pt-20">
      <div className="w-full max-w-[540px] mx-auto">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">회원가입</h1>
          <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
            회원가입을 위해 아래 항목들을 입력해주세요.
          </p>
        </div>
        <form className="space-y-10 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <OrthoInput
            label="아이디 (이메일)"
            placeholder="아이디 (이메일)를 입력해주세요"
            registration={register('email')}
            apiResponse={emailCheckStatus !== null ? !emailCheckStatus : undefined}
            apiResponseMessage={
              emailCheckStatus === true
                ? '사용가능한 아이디 (이메일)에요.'
                : emailCheckStatus === false
                  ? '이미 사용 중인 아이디(이메일)입니다.'
                  : undefined
            }
            error={errors.email?.message}
            rightIcon={
              <div className="flex items-center gap-2 md:gap-5 py-2">
                <Button
                  type="button"
                  onClick={handleEmailCheck}
                  className="text-[color:var(--aiortho-gray-400)] bg-[color:var(--aiortho-gray-100)] hover:bg-[color:var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] cursor-pointer"
                >
                  인증번호 전송
                </Button>
              </div>
            }
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
            type={showPassword ? 'text' : 'password'}
            registration={register('confirmPassword')}
            error={errors.confirmPassword?.message}
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
            label="이름"
            placeholder="이름을 입력해주세요"
            registration={register('name')}
            error={errors.name?.message}
            required
          />

          <MedicalInstitution label="의료 기관명" cta="의료 기관명 검색" />

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
                  className="text-[color:var(--aiortho-gray-400)] bg-[color:var(--aiortho-gray-100)] hover:bg-[color:var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] cursor-pointer"
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
                {certSent && isActive && (
                  <p className="text-sm font-normal text-[color:var(--aiortho-gray-400)]">
                    {formatTime(timer)}
                  </p>
                )}
                <Button
                  type="button"
                  onClick={handleCertificationNumberCheck}
                  disabled={!certSent || !isActive}
                  className={`text-white ${
                    !certSent || !isActive
                      ? 'bg-[color:var(--aiortho-gray-500)] hover:bg-[color:var(--aiortho-gray-500)]'
                      : 'bg-[color:var(--aiortho-primary)] hover:bg-[color:var(--aiortho-primary)]'
                  } rounded-md h-8 font-medium text-[13px]`}
                >
                  확인
                </Button>
              </div>
            }
            required
          />

          <CheckList />

          <Button
            type="submit"
            className="w-full bg-[#0054A6] hover:bg-[#0054A6] text-white py-5 mt-4 md:mb-16 rounded-full cursor-pointer h-12"
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinMembership;
