'use client';
import React from 'react';
import { NavItemProps } from '../types';
import { cn } from '@/lib/utils';

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <li className="relative w-full px-6">
      <button
        className={cn(
          'flex items-center w-full h-12 focus:outline-none max-md:h-11 max-sm:h-10 rounded-xl cursor-pointer',
          isActive
            ? 'font-bold text-[var(--aiortho-primary)] bg-[#EEF4FF]'
            : 'font-medium text-[var(--aiortho-gray-600)] hover:bg-gray-100'
        )}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className="flex items-center gap-2 px-4">
          <div className="flex-shrink-0">
            {typeof icon === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: icon }} />
            ) : (
              React.cloneElement(icon as React.ReactElement<any>, {
                className: cn(
                  'nav-icon',
                  isActive ? 'text-[var(--aiortho-primary)]' : 'text-[var(--aiortho-gray-600)]'
                ),
              })
            )}
          </div>
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

export default NavItem;
