import * as React from 'react';
import { PrescriptionStatus, PrescriptionStatusLabel } from '@/models';

interface StatusBadgeProps {
  status: PrescriptionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorClasses: Record<PrescriptionStatus, { text: string; bg: string; dot: string }> = {
    [PrescriptionStatus.Pending]: {
      text: 'text-[#0CA147]',
      bg: 'bg-[#73E484]/20',
      dot: 'bg-[#0CA147]',
    },
    [PrescriptionStatus.Not_Created]: {
      text: 'text-sky-600',
      bg: 'bg-sky-500/20',
      dot: 'bg-sky-600',
    },
    [PrescriptionStatus.Prescripted]: {
      text: 'text-zinc-900',
      bg: 'bg-zinc-900/10',
      dot: 'bg-zinc-900',
    },
  };

  const { text, bg, dot } = colorClasses[status];

  return (
    <div className={`flex gap-1 justify-center items-center px-3 py-1 rounded-2xl ${bg} min-h-7`}>
      <div
        className={`flex shrink-0 self-stretch my-auto w-2 h-2 ${dot} rounded-full`}
        aria-hidden="true"
      />
      <div className={`self-stretch my-auto ${text}`}>{PrescriptionStatusLabel[status]}</div>
    </div>
  );
}
