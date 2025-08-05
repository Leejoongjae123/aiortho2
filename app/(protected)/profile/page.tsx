'use client';

import { useDoctorProfile, useNurseProfile } from '@/hooks';
import { isDoctorRole } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import OrthoInput from '@/components/OrthoInput';
import { Doctor } from '@/models';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const { auth } = useAuthStore();
  if (!auth) return null;

  const isDoctor = isDoctorRole(auth.role);

  const doctorProfileQuery = useDoctorProfile({ enabled: isDoctor });
  const nurseProfileQuery = useNurseProfile({ enabled: !isDoctor });

  const profileQuery = isDoctor ? doctorProfileQuery : nurseProfileQuery;
  const { data: profile } = profileQuery;

  if (!profile) return null;

  // FIXME: 라벨값 api 수정시 적용 필요

  return (
    <section className="flex flex-col max-w-[680px]">
      <h1 className="text-3xl font-bold text-[var(--aiortho-gray-900)] mb-5">개인정보 수정</h1>
      <h2 className=" text-[var(--aiortho-gray-600)] mb-13">
        의사 면허 번호, 의료 기관명 변경 시 관리자의 재승인 절차가 필요할 수 있어요.
      </h2>

      <div className="flex flex-col gap-6">
        {isDoctor && (
          <OrthoInput label="의사 가입 코드" value={(profile as Doctor).signupCode} readOnly />
        )}

        <OrthoInput label="아이디(이메일)" value={profile.email} readOnly />
        <OrthoInput label="이름" value={profile.name} readOnly />

        {isDoctor && (
          <>
            <OrthoInput label="의사 면허 번호" value={(profile as Doctor).licenseNumber} readOnly />
            <OrthoInput label="의료 기관명" value={(profile as Doctor).hospitalCode} readOnly />
            <OrthoInput label="진료과" value={(profile as Doctor).departmentCode} readOnly />
            <OrthoInput label="전문의 과목" value={(profile as Doctor).specialtyField} readOnly />
            <OrthoInput
              label="전문 면허 번호"
              value={(profile as Doctor).specialistLicenseNumber}
              readOnly
            />

            {(profile as Doctor).nurseIds.map(nurseId => (
              <OrthoInput key={nurseId} label="간호사 이름" value={nurseId} readOnly />
            ))}
          </>
        )}

        <OrthoInput label="휴대폰 번호" value={profile.phoneNumber} readOnly />
      </div>

      <div className="flex flex-col items-center gap-5 mt-12">
        <button
          className="flex w-full h-12 items-center justify-center rounded-full bg-[var(--aiortho-gray-600)] text-white text-center text-sm font-bold cursor-pointer"
          onClick={() => router.push('/profile/edit')}
        >
          수정하기
        </button>

        <button
          className="text-sm text-[var(--aiortho-gray-800)] underline underline-offset-4 cursor-pointer"
          onClick={() => router.push('/profile/delete')}
        >
          회원탈퇴
        </button>
      </div>
    </section>
  );
}
