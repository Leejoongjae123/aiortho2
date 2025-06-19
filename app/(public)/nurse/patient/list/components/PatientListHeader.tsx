'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function PatientListHeader() {
  const router = useRouter();

  return (
    <div className="flex w-full md:flex-row flex-col items-stretch gap-5 font-bold flex-wrap justify-between">
      <div className="text-[#161621] self-stretch my-auto text-2xl lg:text-3xl">환자 명단</div>
      <button
        onClick={() => router.push('/doctor/patient/register')}
        className="self-stretch rounded-[14px] min-h-[48px] px-[22px] py-3 text-sm text-white bg-[#0054A6] hover:bg-[#003d7a] transition-colors cursor-pointer sm:px-5"
      >
        환자 등록하기
      </button>
    </div>
  );
}
