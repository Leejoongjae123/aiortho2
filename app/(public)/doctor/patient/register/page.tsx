'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import OrthoInput from '@/components/OrthoInput';
import { toast } from 'sonner';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { showWarningToast } from '@/components/ui/toast-warning';
const PatientRegisterPage = () => {
  const router = useRouter();
  const [patientName, setPatientName] = useState('');
  const [birthDate, setBirthDate] = useState(''); // 앞 6자리
  const [genderDigit, setGenderDigit] = useState(''); // 뒤 1자리
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');

  // Form validation states
  const [errors, setErrors] = useState({
    patientName: false,
    idNumber: false,
    hospitalNumber: false,
    guardianName: false,
    guardianPhone: false,
  });

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setBirthDate(value);
    }
  };

  const handleGenderDigitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 1) {
      setGenderDigit(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors = {
      patientName: !patientName,
      idNumber: birthDate.length !== 6 || genderDigit.length !== 1,
      hospitalNumber: false, // Optional field
      guardianName: !guardianName,
      guardianPhone: !guardianPhone,
    };

    setErrors(newErrors);

    // If no errors, submit form
    if (!Object.values(newErrors).some(Boolean)) {
      // 환자 등록 성공 토스트 표시
      showSuccessToast('환자 등록 완료', '환자 정보가 등록되었습니다.');

      // 등록 완료 후 status 페이지로 이동
      router.push('/doctor/patient/status');
    } else {
      // 에러가 있을 경우 에러 토스트 표시
      showWarningToast('입력 정보를 확인해 주세요', '필수 항목을 모두 입력해 주세요.');
    }
  };

  return (
    <div className="bg-white flex w-full pt-[1px] pb-[74px] flex-col items-center">
      <div className="flex mt-4 md:mt-[52px] mx-4 md:ml-8 w-full max-w-[540px] flex-col px-4">
        <h1 className="text-[#161621] text-3xl font-bold">환자 정보</h1>
        <p className="text-[#66798D] text-[17px] font-normal mt-5">
          환자 정보을 위해 아래 항목들을 입력해주세요.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 md:mt-[57px] w-full">
          <div className="w-full mb-6">
            <div className="text-[#8395ac] text-sm">
              환자명 <span className="text-[#0054A6]">*</span>
            </div>
            <div className="mt-3 w-full">
              <input
                type="text"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                placeholder="환자명을 입력하세요"
                className="text-[#161621] w-full rounded-[12px] border border-[#DADFE9] min-h-[48px] px-4 py-4 text-base focus:border-[#0054A6] focus:outline-none focus:border-3"
              />
              {errors.patientName && (
                <div className="text-[#FF0D4E] text-sm mt-2">필수 입력 항목이에요</div>
              )}
            </div>
          </div>

          <div className="w-full mb-6">
            <div className="text-[#8395ac] text-sm">
              주민등록번호 <span className="text-[#0054A6]">*</span>
            </div>
            <div className="mt-3 w-full">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={birthDate}
                  onChange={handleBirthDateChange}
                  placeholder="생년월일 6자리"
                  className="text-[#161621] text-start w-[50%] rounded-[12px] border border-[#DADFE9] min-h-[48px] px-4 py-4 text-base font-mono tracking-wider text-center focus:border-[#0054A6] focus:border-3 focus:outline-none"
                  maxLength={6}
                />
                <span className="text-[#161621] text-lg font-mono">-</span>
                <input
                  type="text"
                  value={genderDigit}
                  onChange={handleGenderDigitChange}
                  placeholder="0"
                  className="text-[#161621] w-[50px] rounded-[12px] border border-[#DADFE9] min-h-[48px] px-4 py-4 text-base font-mono tracking-wider text-center focus:border-[#0054A6] focus:outline-none focus:border-3"
                  maxLength={1}
                />
                <span className="text-[#8395ac] text-lg font-mono tracking-widest">●●●●●●</span>
              </div>
              {errors.idNumber && (
                <div className="text-[#FF0D4E] text-sm mt-2">
                  주민등록번호를 올바르게 입력해주세요
                </div>
              )}
            </div>
          </div>

          <div className="w-full mb-6">
            <div className="text-[#8395AC] text-sm">병원 환자 번호</div>
            <div className="mt-3 w-full">
              <input
                type="text"
                value={hospitalNumber}
                onChange={e => setHospitalNumber(e.target.value)}
                placeholder="병원 환자 번호를 입력하세요"
                className="text-[#161621] w-full rounded-[12px] border border-[#DADFE9] min-h-[48px] px-4 py-4 text-base focus:border-[#0054A6] focus:outline-none focus:border-3"
              />
              {errors.hospitalNumber && (
                <div className="text-[#FF0D4E] text-sm mt-2">올바른 생년월일 형식이 아니에요.</div>
              )}
            </div>
          </div>

          <div className="w-full mb-6">
            <div className="text-[#8395ac] text-sm">
              보호자명<span className="text-[#0054A6]"> *</span>
            </div>
            <div className="mt-3 w-full">
              <input
                type="text"
                value={guardianName}
                onChange={e => setGuardianName(e.target.value)}
                placeholder="보호자명을 입력하세요"
                className="text-[#161621] w-full rounded-[12px] border border-[#DADFE9] min-h-[48px] px-4 py-4 text-base focus:border-[#0054A6] focus:outline-none focus:border-3"
              />
              {errors.guardianName && (
                <div className="text-[#FF0D4E] text-sm mt-2">올바른 생년월일 형식이 아니에요.</div>
              )}
            </div>
          </div>

          <div className="w-full mb-6">
            <div className="text-[#8395ac] text-sm">
              보호자 휴대폰 번호
              <span className="text-[#0054A6]"> *</span>
            </div>
            <div className="mt-3 w-full">
              <input
                type="text"
                value={guardianPhone}
                onChange={e => setGuardianPhone(e.target.value)}
                placeholder="보호자 휴대폰 번호를 입력하세요"
                className="text-[#161621] w-full rounded-[12px] border border-[#DADFE9] min-h-[48px] px-4 py-4 text-base focus:border-[#0054A6] focus:outline-none focus:border-3"
              />
              {errors.guardianPhone && (
                <div className="text-[#FF0D4E] text-sm mt-2">올바른 생년월일 형식이 아니에요.</div>
              )}
            </div>
          </div>

          <div className="flex mt-12 justify-end">
            <button
              type="submit"
              className="bg-[#0054A6] text-white font-bold rounded-full min-w-[240px] min-h-[48px] w-full px-5 py-3"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegisterPage;
