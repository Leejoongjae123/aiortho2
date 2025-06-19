'use client';
import * as React from 'react';

interface TitleSectionProps {
  title: string;
  count: number;
  onResetColumnOrder?: () => void;
}

function TitleSection({ title, count, onResetColumnOrder }: TitleSectionProps) {
  return (
    <header className="flex gap-4 items-center justify-between w-full">
      <div className="flex gap-2 items-center text-2xl font-bold leading-none whitespace-nowrap">
        <h1 className="self-stretch my-auto text-zinc-900">{title}</h1>
        <div className="flex items-center self-stretch my-auto">
          <span className="self-stretch my-auto text-sky-700">{count}</span>
          <span className="self-stretch my-auto text-zinc-900">명</span>
        </div>
      </div>

      {onResetColumnOrder && (
        <button
          onClick={onResetColumnOrder}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-colors"
          title="컬럼 순서 초기화"
        >
          컬럼 순서 초기화
        </button>
      )}
    </header>
  );
}

export default TitleSection;
