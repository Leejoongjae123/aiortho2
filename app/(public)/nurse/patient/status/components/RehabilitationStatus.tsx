'use client';
import React from 'react';
import RehabilitationDetailsCard from './RehabilitationDetailsCard';
import RehabilitationCalendar from './RehabilitationCalendar';
import ProgressBar from './ProgressBar';
import TreatmentDetailReport from './TreatmentDetailReport';

const RehabilitationStatus = () => {
  return (
    <div className="flex mt-30 items-stretch gap-10 font-pretandard flex-wrap md:max-w-full md:mt-10">
      <div className="flex-grow flex-shrink-0 flex-basis-0 w-fit">
        <div className="w-full">
          <div className="text-[#161621] text-[22px] font-bold leading-[1.4] md:max-w-full">
            재활 치료 현황
          </div>
          <div className="text-[#66798D] text-base font-normal leading-[22px] mt-3">
            환자의 재활 치료 현황을 확인할 수 있습니다.
          </div>

          {/* Calendar가 전체 폭을 차지하고 Details는 absolute로 오른쪽에 */}
          <div className="relative mt-5">
            <RehabilitationCalendar />
            {/* <div className="absolute top-0 right-[-600px]">
              <RehabilitationDetailsCard />
            </div> */}
          </div>

          {/* Treatment Detail Report below the calendar */}
          <div className="mt-8">
            <TreatmentDetailReport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehabilitationStatus;
