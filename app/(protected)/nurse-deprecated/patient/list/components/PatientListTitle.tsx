'use client';
import React from 'react';
import { PatientListTitleProps } from '../types';

export default function PatientListTitle({ title, count }: PatientListTitleProps) {
  return (
    <header className="flex gap-2 items-center self-start text-2xl font-bold leading-none whitespace-nowrap mb-4">
      <h1 className="self-stretch my-auto text-zinc-900">총</h1>
      <div className="flex items-center self-stretch my-auto">
        <span className="self-stretch my-auto text-sky-700">{count.toLocaleString()}</span>
        <span className="self-stretch my-auto text-zinc-900">명</span>
      </div>
    </header>
  );
}
