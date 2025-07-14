'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface SubNavItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SubNavItem: React.FC<SubNavItemProps> = ({ label, isActive = false, onClick }) => {
  return (
    <li className="relative w-full">
      <button
        className={cn(
          'flex items-center w-full h-12 max-md:h-11 max-sm:h-10 rounded-xl',
          isActive
            ? 'font-bold text-[var(--aiortho-primary)] bg-[#EEF4FF]'
            : 'font-medium text-[var(--aiortho-gray-600)] hover:bg-gray-100'
        )}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className="flex items-center gap-2 px-4">
          <div className="w-5 h-5 flex-shrink-0" />
          <span
            className={cn(
              'overflow-hidden shrink-0 text-sm tracking-wide leading-6 whitespace-nowrap text-ellipsis w-[104px] text-left max-md:text-sm max-sm:text-xs text-[var(--aiortho-gray-600)]',
              isActive && 'text-[var(--aiortho-primary)] font-bold'
            )}
          >
            {label}
          </span>
        </div>
      </button>
    </li>
  );
};

export default SubNavItem;
