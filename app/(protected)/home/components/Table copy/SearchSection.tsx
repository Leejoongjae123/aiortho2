'use client';
import * as React from 'react';
import { Search } from 'lucide-react';

function SearchSection() {
  return (
    <>
      {/* Search Bar */}
      <div className="flex absolute top-8 right-8 z-0 flex-col max-w-full h-10 text-sm whitespace-nowrap rounded-none text-slate-400 w-[272px]">
        <div className="flex flex-col justify-center px-3 py-2.5 w-full rounded-2xl bg-slate-100 fill-slate-100 border border-transparent focus-within:border-[#0054A6] focus-within:border-2 focus-within:bg-white transition-colors">
          <div className="flex gap-2 items-center">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="검색"
              className="flex-1 bg-transparent border-none outline-none text-slate-400 placeholder:text-slate-400 focus:text-[#161621]"
              aria-label="환자 검색"
            />
          </div>
        </div>
      </div>

      {/* Filter Option */}
      <div className="flex absolute z-0 gap-2 items-center text-sm font-medium leading-none left-[199px] text-slate-400 top-[38px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/0aeafc554956665f06e63f1d577f6ac6e4df0b54?placeholderIfAbsent=true"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          alt="Filter icon"
        />
        <button
          className="self-stretch my-auto text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="내 환자만 보기 필터 적용"
        >
          내 환자만 보기
        </button>
      </div>
    </>
  );
}

export default SearchSection;
