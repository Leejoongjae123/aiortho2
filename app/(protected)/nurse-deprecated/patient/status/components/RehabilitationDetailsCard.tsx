'use client';
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { X } from 'lucide-react';
interface ExerciseDetail {
  id: number;
  name: string;
  totalTime: string;
  goodPostureTime: string;
}

interface RehabilitationDetailsCardProps {
  date?: string;
  totalRehabTime?: string;
  goodPostureTime?: string;
  exercises?: ExerciseDetail[];
}

const RehabilitationDetailsCard: React.FC<RehabilitationDetailsCardProps> = ({
  date = '2024년 10월 1일',
  totalRehabTime = '10분 12초',
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
    <div className="border border-[rgba(218,223,233,0.6)] rounded-xl  p-6 flex flex-col items-stretch font-pretandard justify-center md:px-5">
      <div className="w-full md:max-w-full">
        <div className="flex w-full items-center gap-4 text-base text-[#161621] font-medium justify-start flex-wrap md:max-w-full">
          <X className="w-6 h-6 flex-shrink-0 my-auto" />
          <div className="text-[#161621] flex-1 flex-shrink-1 basis-0 md:max-w-full min-w-[240px] my-auto min-h-6 w-full text-center">
            {date}
          </div>
        </div>

        <div className="mt-5 w-full md:max-w-full">
          <div className="w-full text-sm leading-none md:max-w-full">
            <div className="flex w-[232px] max-w-full flex-col items-stretch justify-start">
              <div className="self-start flex items-center gap-2 justify-start">
                <div className="text-[#161621] font-medium self-stretch my-auto">
                  총 재활 치료 시간
                </div>
                <div className="text-[#0054A6] font-normal self-stretch my-auto">
                  {totalRehabTime}
                </div>
              </div>
              <div className="flex mt-3 w-full items-center gap-2 justify-start">
                <div className="text-[#161621] font-medium self-stretch my-auto">
                  좋은 자세 치료 시간
                </div>
                <div className="text-[#0054A6] font-normal self-stretch my-auto">
                  {goodPostureTime}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#F0F3FA] mt-5" />
          </div>

          <div className="mt-3 w-full md:max-w-full">
            <div className="w-full md:max-w-full">
              <div className="text-[#161621] w-full md:max-w-full bg-white text-sm font-medium leading-none">
                재활치료 세부내용
              </div>

              <div className="mt-3 md:max-w-full">
                <div className="w-full md:max-w-full">
                  {exercises.map((exercise, index) => (
                    <React.Fragment key={exercise.id}>
                      <div className="flex w-full items-start gap-1 justify-start flex-wrap md:max-w-full">
                        <div className="flex min-h-5 items-center text-[10px] text-[#343F4E] font-medium whitespace-nowrap text-center leading-5 justify-center flex-grow flex-shrink w-4 md:whitespace-normal">
                          <div className="text-[#343F4E] rounded-full border border-[#343F4E] bg-white self-stretch my-auto h-3.5 w-3.5 flex items-center justify-center md:whitespace-normal">
                            {exercise.id}
                          </div>
                        </div>

                        <div className="min-w-[240px] text-[13px] flex-grow flex-shrink w-[504px] md:max-w-full">
                          <div className="text-[#343F4E] font-medium leading-8 md:max-w-full line-clamp-1">
                            {exercise.name}
                          </div>

                          <div className="mt-2 w-full font-normal leading-none md:max-w-full">
                            <div className="flex w-full items-center gap-2 justify-start flex-wrap md:max-w-full">
                              <div className="text-[#343F4E] self-stretch my-auto line-clamp-1">
                                총 재활 치료 시간{' '}
                              </div>
                              <div className="text-[#0054A6] self-stretch my-auto w-[158px] line-clamp-1">
                                {exercise.totalTime}
                              </div>
                            </div>

                            <div className="flex mt-1 w-full items-center gap-2 justify-start flex-wrap md:max-w-full">
                              <div className="text-[#343F4E] self-stretch my-auto line-clamp-1">
                                좋은 치료 동작 시간
                              </div>
                              <div className="text-[#0054A6] self-stretch my-auto w-[147px] line-clamp-1">
                                {exercise.goodPostureTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {index < exercises.length - 1 && (
                        <div className="w-full h-px bg-[#F0F3FA] my-4 md:max-w-full" />
                      )}
                    </React.Fragment>
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

export default RehabilitationDetailsCard;
