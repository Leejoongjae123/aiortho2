import React from 'react';

interface Doctor {
  id: string;
  code: string;
  name: string;
  email: string;
  date: string;
  isAdmin: boolean;
}

interface DoctorTableProps {
  doctors: Doctor[];
}

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors }) => {
  return (
    <div className="mt-7 w-full md:max-w-full">
      {/* Table Header */}
      <div className="rounded-xl bg-[rgba(241,244,249,0.5)] flex min-h-[48px] w-full items-center justify-start md:max-w-full">
        <div className="flex min-h-[48px] px-4 py-3 flex-col items-start justify-center w-[124px]">
          <div className="flex w-16 items-center justify-start">
            <div className="text-[#161621] font-pretendard text-sm font-bold opacity-80">No</div>
            <div className="flex min-h-6 px-2 py-1 items-center justify-center w-6">
              <div className="w-[9px]">
                <img
                  src="/icons/sort-up.svg"
                  alt="Sort"
                  className="aspect-[1.29] object-contain w-full"
                />
                <img
                  src="/icons/sort-down.svg"
                  alt="Sort"
                  className="aspect-[1.43] object-contain w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[48px] px-3 py-4 items-center gap-[10px] font-pretendard text-sm text-[#161621] font-bold justify-start w-[188px]">
          <div className="text-[#161621] opacity-80 w-[72px]">코드 번호</div>
        </div>

        <div className="flex min-h-[48px] px-3 py-3 flex-col items-start justify-center w-[176px]">
          <div className="flex w-16 items-center justify-start">
            <div className="text-[#161621] font-pretendard text-sm font-bold opacity-80">
              의사명
            </div>
            <div className="flex min-h-6 px-2 py-1 items-center justify-center w-6">
              <div className="w-[9px]">
                <img
                  src="/icons/sort-up.svg"
                  alt="Sort"
                  className="aspect-[1.29] object-contain w-full"
                />
                <img
                  src="/icons/sort-down.svg"
                  alt="Sort"
                  className="aspect-[1.43] object-contain w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-[240px] min-h-[48px] px-3 py-4 items-center gap-[10px] font-pretendard text-sm text-[#161621] font-bold whitespace-nowrap justify-start w-[328px] md:whitespace-normal">
          <div className="text-[#161621] opacity-80 w-[176px]">아이디(이메일)</div>
        </div>

        <div className="flex min-w-[240px] min-h-[48px] px-3 py-3 flex-col items-center justify-center w-[256px]">
          <div className="flex w-full max-w-[226px] items-center justify-start">
            <div className="text-[#161621] font-pretendard text-sm font-bold opacity-80">
              가입일
            </div>
            <div className="flex min-h-6 px-2 py-1 items-center justify-center w-6">
              <div className="w-[9px]">
                <img
                  src="/icons/sort-up.svg"
                  alt="Sort"
                  className="aspect-[1.29] object-contain w-full"
                />
                <img
                  src="/icons/sort-down.svg"
                  alt="Sort"
                  className="aspect-[1.43] object-contain w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[124px] h-[48px]"></div>
      </div>

      {/* Table Body */}
      <div className="w-full md:max-w-full">
        {doctors.map((doctor, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-full font-pretendard text-sm ${doctor.isAdmin ? 'text-[#0054A6]' : 'text-[#161621]'} font-normal md:max-w-full`}
            >
              <div className="flex min-h-[68px] w-full items-center justify-start flex-wrap md:max-w-full">
                <div className="flex min-h-[68px] px-4 py-[26px] flex-col items-stretch whitespace-nowrap justify-center w-[124px] md:whitespace-normal">
                  <div className={`opacity-80 ${doctor.isAdmin ? 'font-semibold' : ''}`}>
                    {doctor.id}
                  </div>
                </div>

                <div className="flex min-h-[68px] px-3 py-[26px] items-center gap-[10px] whitespace-nowrap justify-start w-[188px] md:whitespace-normal">
                  <div className="opacity-80 w-[72px]">{doctor.code}</div>
                </div>

                <div className="flex min-h-[68px] px-3 py-[26px] gap-[10px] whitespace-nowrap w-[176px] md:whitespace-normal overflow-hidden text-ellipsis">
                  {doctor.name}
                </div>

                <div className="flex min-w-[240px] min-h-[68px] px-3 py-[26px] items-center gap-[10px] whitespace-nowrap justify-start w-[328px] md:whitespace-normal">
                  <div className="opacity-80 w-[176px]">{doctor.email}</div>
                </div>

                <div className="flex min-w-[240px] min-h-[68px] px-3 py-[26px] items-center gap-[10px] justify-start w-[256px]">
                  <div className="opacity-80 w-[116px]">{doctor.date}</div>
                </div>

                <div className="w-[124px] min-h-[68px]"></div>
              </div>
              <div className="w-full h-[1px] bg-[#8395AC] opacity-20"></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DoctorTable;
