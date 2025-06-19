'use client';
import React from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* 이전 페이지 버튼 */}
      <button className="flex w-8 h-8 justify-center items-center rounded-lg border border-[#E5E5E5] bg-white hover:bg-gray-50 transition-colors">
        <IoChevronBack className="w-4 h-4 text-[#666]" />
      </button>

      {/* 페이지 번호들 */}
      <div className="flex gap-1">
        <button className="flex w-8 h-8 justify-center items-center rounded-lg bg-[#0054A6] text-white text-sm font-medium">
          1
        </button>
        <button className="flex w-8 h-8 justify-center items-center rounded-lg text-[#666] text-sm font-medium hover:bg-gray-50 transition-colors">
          2
        </button>
        <button className="flex w-8 h-8 justify-center items-center rounded-lg text-[#666] text-sm font-medium hover:bg-gray-50 transition-colors">
          3
        </button>
        <button className="flex w-8 h-8 justify-center items-center rounded-lg text-[#666] text-sm font-medium hover:bg-gray-50 transition-colors">
          4
        </button>
        <button className="flex w-8 h-8 justify-center items-center rounded-lg text-[#666] text-sm font-medium hover:bg-gray-50 transition-colors">
          5
        </button>
      </div>

      {/* 다음 페이지 버튼 */}
      <button className="flex w-8 h-8 justify-center items-center rounded-lg border border-[#E5E5E5] bg-white hover:bg-gray-50 transition-colors">
        <IoChevronForward className="w-4 h-4 text-[#666]" />
      </button>
    </div>
  );
}
