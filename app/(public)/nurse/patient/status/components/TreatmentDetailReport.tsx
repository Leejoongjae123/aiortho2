'use client';
import React from 'react';

interface TreatmentDetailReportProps {
  date?: string;
  totalTreatmentTime?: string;
  goodPostureTime?: string;
  exercises?: {
    id: number;
    name: string;
    totalTime: string;
    goodPostureTime: string;
  }[];
}

const TreatmentDetailReport: React.FC<TreatmentDetailReportProps> = ({
  date = '2024년 10월 1일',
  totalTreatmentTime = '10분 12초',
  goodPostureTime = '4분 20초',
  exercises = [
    {
      id: 1,
      name: '고개 기울이기 스트레칭',
      totalTime: '10분 12초',
      goodPostureTime: '4분 08초',
    },
    {
      id: 2,
      name: '정위 반응을 이용한 근력 운동',
      totalTime: '10분 12초',
      goodPostureTime: '4분 08초',
    },
    {
      id: 3,
      name: '몸통 스트레칭',
      totalTime: '10분 12초',
      goodPostureTime: '4분 08초',
    },
  ],
}) => {
  return (
    <div className="rounded-xl border border-[rgba(218,223,233,0.6)] max-w-[960px] px-6 py-6 flex flex-col font-pretendard md:px-5">
      <div className="w-full">
        {/* Date Header */}
        <div className="flex w-full items-center gap-4 text-base text-[#161621] font-medium text-center flex-wrap">
          <div className="flex self-stretch my-auto w-[19px] h-6 flex-shrink-0">
            {/* Calendar icon placeholder */}
            <svg
              width="19"
              height="24"
              viewBox="0 0 19 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9H17M2 9V19C2 20.1046 2.89543 21 4 21H15C16.1046 21 17 20.1046 17 19V9M2 9V7C2 5.89543 2.89543 5 4 5H15C16.1046 5 17 5.89543 17 7V9M6 3V7M13 3V7"
                stroke="#161621"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-[240px] text-[#161621]">{date}</div>
        </div>

        {/* Statistics Section */}
        <div className="mt-5 w-full">
          <div className="w-full text-sm leading-none">
            <div className="w-[232px] max-w-full flex flex-col">
              <div className="flex items-center gap-2">
                <div className="text-[#161621] font-medium">총 재활 치료 시간</div>
                <div className="text-[#0054A6] font-normal">{totalTreatmentTime}</div>
              </div>
              <div className="flex mt-3 w-full items-center gap-2">
                <div className="text-[#161621] font-medium">좋은 자세 치료 시간</div>
                <div className="text-[#0054A6] font-normal">{goodPostureTime}</div>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full mt-5 h-px bg-[#F0F3FA]"></div>
          </div>

          {/* Exercise Details Section */}
          <div className="mt-3 w-full">
            <div className="flex w-full flex-col">
              <div className="text-[#161621] text-sm font-medium leading-none">
                재활치료 세부내용
              </div>

              <div className="mt-3">
                <div className="w-full">
                  {exercises.map((exercise, index) => (
                    <div key={exercise.id}>
                      <div className="flex w-full items-start gap-1 max-w-[455px]">
                        {/* Number Circle */}
                        <div className="flex min-h-5 items-center text-[10px] text-[#343F4E] font-medium whitespace-nowrap text-center tracking-[0.1px] leading-5 justify-center w-5 md:whitespace-normal">
                          <div className="rounded-full border border-[#343F4E] bg-white h-[14px] w-[14px] flex items-center justify-center text-[10px] text-[#343F4E]">
                            {exercise.id}
                          </div>
                        </div>

                        {/* Exercise Content */}
                        <div className="min-w-[240px] text-[13px] flex-1 ml-1">
                          <div className="text-[#343F4E] font-medium leading-[2] line-clamp-1 text-ellipsis">
                            {exercise.name}
                          </div>
                          <div className="mt-2 w-full font-normal leading-none">
                            <div className="flex w-full items-center gap-2 flex-wrap">
                              <div className="text-[#343F4E] line-clamp-1 text-ellipsis">
                                총 재활 치료 시간{' '}
                              </div>
                              <div className="text-[#0054A6] line-clamp-1 text-ellipsis w-[158px]">
                                {exercise.totalTime}
                              </div>
                            </div>
                            <div className="flex mt-1 w-full items-center gap-2 flex-wrap">
                              <div className="text-[#343F4E] line-clamp-1 text-ellipsis">
                                좋은 치료 동작 시간
                              </div>
                              <div className="text-[#0054A6] line-clamp-1 text-ellipsis w-[147px]">
                                {exercise.goodPostureTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Separator between exercises */}
                      {index < exercises.length - 1 && (
                        <div className="w-full mt-4 h-px bg-[#F0F3FA]"></div>
                      )}

                      {/* Space between exercises */}
                      {index < exercises.length - 1 && <div className="mt-3"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetailReport;
