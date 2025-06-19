import React from 'react';
import { AvatarIcon } from './Icons';

const DoctorHeader: React.FC = () => {
  return (
    <header className="flex gap-4 items-start w-full">
      <div className="flex shrink-0 justify-center items-center h-16 w-16 sm:h-20 sm:w-20 lg:h-[84px] lg:w-[84px]">
        <AvatarIcon />
      </div>
      <div className="flex flex-col flex-1 gap-2 sm:gap-2.5 items-start">
        <div className="flex gap-2 items-center flex-wrap">
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl lg:leading-10">
            박의사님,
          </h1>
          <span className="text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl lg:leading-10">
            안녕하세요
          </span>
        </div>
        <p className="text-base leading-6 text-slate-500 sm:text-lg">의사 코드 - UH2406001</p>
      </div>
    </header>
  );
};

export default DoctorHeader;
