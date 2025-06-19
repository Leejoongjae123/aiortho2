'use client';
import * as React from 'react';

interface TitleSectionProps {
  title: string;
  count: number;
}

function TitleSection({ title, count }: TitleSectionProps) {
  return (
    <header className="flex gap-2 items-center self-start text-2xl font-bold leading-none whitespace-nowrap">
      <h1 className="self-stretch my-auto text-zinc-900">{title}</h1>
      <div className="flex items-center self-stretch my-auto">
        <span className="self-stretch my-auto text-sky-700">{count}</span>
        <span className="self-stretch my-auto text-zinc-900">명</span>
      </div>
    </header>
  );
}

export default TitleSection;
