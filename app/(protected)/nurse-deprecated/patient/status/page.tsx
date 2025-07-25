'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusToggle from '@/components/ui/status-toggle';
import PrescriptionCard from './components/PrescriptionProgram';
import Pagination from './components/Pagination';
import RehabilitationStatus from './components/RehabilitationStatus';
import ProgressBar from './components/ProgressBar';
const PatientStatusPage = () => {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState('처방전');

  const statusOptions = ['처방전', '처방대기', '완료'];

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    // 상태에 따른 UI 업데이트나 다른 비즈니스 로직을 여기에 추가할 수 있습니다
    // 예: 서버에 상태 변경 요청, 다른 컴포넌트 상태 업데이트 등
  };

  return (
    <div className="bg-white flex px-20 pt-14 flex-col overflow-hidden items-start justify-center md:px-5 ">
      <div className="w-[50vw] max-w-full">
        {/* Patient Information Card */}
        <div className="rounded-2xl bg-[#F7F9FB] w-full overflow-hidden md:max-w-full p-8">
          <div className="flex w-full items-start gap-5 justify-between md:max-w-full">
            <div className="flex mt-1 flex-col items-stretch">
              <div className="self-start flex items-center gap-2 justify-start">
                <div className="self-stretch flex my-auto min-h-5 items-center gap-1 font-pretandard text-2xl text-[#161621] whitespace-nowrap leading-none justify-start md:whitespace-normal">
                  <div className="text-[#161621] font-bold self-stretch my-auto">박명수</div>
                  <div className="text-[#161621] font-normal self-stretch my-auto">님</div>
                </div>
                <div className="rounded-full bg-[#E9ECF2] self-stretch flex my-auto min-h-7 p-[5px] items-center justify-center w-7 h-7">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/0d877f30b4343e693ad4cf1f811cdd15c9dad0de?placeholderIfAbsent=true"
                    className="aspect-square object-contain object-center w-[18px] self-stretch my-auto"
                    alt="Gender icon"
                  />
                </div>
              </div>
              <div className="flex mt-3 min-h-4 items-center gap-3 font-pretandard text-base text-[#66798D] font-normal leading-none justify-start">
                <div className="text-[#66798D] self-stretch my-auto">환자코드 SKDA19703</div>
                <div className="text-[#66798D] self-stretch my-auto">|</div>
                <div className="text-[#66798D] self-stretch my-auto">남성</div>
              </div>
            </div>
            <StatusToggle
              options={statusOptions}
              activeOption={activeStatus}
              onOptionChange={handleStatusChange}
              className="md:whitespace-normal"
            />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/d360bb3561f0370f9e9f75210738f174cf34f51b?placeholderIfAbsent=true"
            className="aspect-[500] object-contain object-center w-full mt-7 md:max-w-full md:mr-1"
            alt="Patient information divider"
          />
          <div className="flex mt-5 items-center gap-6 font-pretandard justify-between md:mr-1">
            <div className="self-stretch my-auto w-20">
              <div className="text-[#66798D] text-xs font-normal">병원 환자 번호</div>
              <div className="text-[#343F4E] text-sm font-semibold leading-none mt-1">M1012818</div>
            </div>
            <div className="self-stretch my-auto whitespace-nowrap w-[60px] md:whitespace-normal">
              <div className="text-[#66798D] text-xs font-normal">생년월일</div>
              <div className="text-[#343F4E] text-sm font-semibold leading-none mt-1">980516</div>
            </div>
            <div className="self-stretch my-auto whitespace-nowrap w-[60px] md:whitespace-normal">
              <div className="text-[#66798D] text-xs font-normal">보호자명</div>
              <div className="text-[#343F4E] text-sm font-semibold leading-none mt-1">박주호</div>
            </div>
            <div className="self-stretch my-auto w-[108px]">
              <div className="text-[#66798D] text-xs font-normal">보호자 휴대폰 번호</div>
              <div className="text-[#343F4E] text-sm font-semibold leading-none mt-1">
                010-2921-2715
              </div>
            </div>
            <div className="self-stretch my-auto whitespace-nowrap w-[72px] md:whitespace-normal">
              <div className="text-[#66798D] text-xs font-normal">라이센스번호</div>
              <div className="text-[#343F4E] text-sm font-semibold leading-none mt-1">-</div>
            </div>
          </div>
        </div>

        {/* Current Prescription Section */}
        <div className="flex mt-22 items-stretch gap-10 font-pretandard flex-wrap md:mt-10">
          <div className="flex-grow flex-shrink-0 flex-basis-0 w-fit">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex flex-col ">
                <div className="text-[#161621] text-[22px] font-bold leading-[1.4] md:max-w-full">
                  진행중 처방 내역
                </div>
                <div className="text-[#66798D] text-base font-normal leading-none mt-3">
                  현재 치료 진행중인 재활 프로그램 처방 내역입니다.
                </div>
              </div>
              <div>
                <button className="justify-center items-stretch rounded-xl self-start flex min-h-10 flex-col text-sm text-white font-semibold whitespace-nowrap text-center md:whitespace-normal bg-[#0054A6]">
                  <div className="self-stretch flex-1 flex-shrink-1 flex-basis-0 rounded-xl bg-[rgba(246,248,252,0)] min-h-10 w-full px-4 py-3 md:whitespace-normal">
                    처방하기
                  </div>
                </button>
              </div>
            </div>
            <div className="mt-10">
              <PrescriptionCard isExpanded={true} />
            </div>
          </div>
        </div>

        {/* Past Prescription Section */}
        <div className="mt-30 font-pretandard md:max-w-full md:mt-10">
          <div className="w-full md:max-w-full">
            <div className="w-full md:max-w-full">
              <div className="w-full md:max-w-full">
                <div className="text-[#161621] text-[22px] font-bold leading-[1.4] md:max-w-full">
                  지난 처방 내역
                </div>
                <PrescriptionCard isExpanded={false} />
                <PrescriptionCard isExpanded={false} />
                <PrescriptionCard isExpanded={false} />
                <PrescriptionCard isExpanded={false} />
              </div>
            </div>
          </div>
        </div>

        <Pagination />

        <RehabilitationStatus />

        {/* License Number Section */}
        <div className="flex mt-30 items-stretch gap-10 font-pretandard flex-wrap md:max-w-full md:mt-10">
          <div className="flex-grow flex-shrink-0 flex-basis-0 w-fit">
            <div className="w-full">
              <div className="text-[#161621] text-[22px] font-bold leading-[1.4] md:max-w-full">
                라이센스 번호
              </div>
              <div className="text-[#66798D] text-base font-normal leading-[22px] mt-3">
                보호자 휴대폰 번호로 전송된 라이센스 번호를 입력해, <br />
                AIOrtho App에서 자가 치료를 할 수 있습니다.{' '}
              </div>
            </div>
          </div>
          <button className="justify-center items-stretch rounded-xl self-start flex min-h-10 flex-col text-sm text-white font-semibold whitespace-nowrap text-center md:whitespace-normal bg-[#66798D]">
            <div className="self-stretch flex-1 flex-shrink-1 flex-basis-0 rounded-xl bg-[rgba(246,248,252,0)] min-h-10 w-full px-4 py-3 md:whitespace-normal">
              전송
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-28 w-full font-pretandard text-sm md:max-w-full md:mt-10">
          <div className="flex w-full items-start gap-4 text-white font-bold whitespace-nowrap leading-6 justify-end md:max-w-full md:whitespace-normal">
            <button className="self-stretch rounded-full min-w-[240px] min-h-[48px] w-full px-5 py-3 flex-1 flex-shrink-1 flex-basis-0 md:max-w-full md:whitespace-normal bg-[#0054A6]">
              처방하기
            </button>
          </div>
          <button className="text-[#343F4E] underline self-stretch flex-1 flex-shrink-1 flex-basis-0 md:max-w-full mt-4 w-full gap-4 font-normal text-center leading-none">
            환자 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientStatusPage;
