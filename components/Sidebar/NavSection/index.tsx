'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { NavSectionProps } from '../types';
import { cn } from '@/lib/utils';

const NavSection: React.FC<NavSectionProps> = ({
  icon,
  label,
  children,
  isActive,
  isExpanded: initialExpanded = false,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  // isExpanded prop이 변경될 때마다 상태 업데이트
  useEffect(() => {
    setIsExpanded(initialExpanded);
  }, [initialExpanded]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) onToggle();
  };

  return (
    <li className="relative w-full flex flex-col gap-2 px-6">
      <button
        className="flex items-center w-full h-12 focus:outline-none max-md:h-11 max-sm:h-10 rounded-xl px-4 hover:bg-gray-100 cursor-pointer"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={`section-${label.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center gap-2 flex-1">
          <div className="flex-shrink-0">
            {typeof icon === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: icon }} />
            ) : (
              React.cloneElement(icon as React.ReactElement<any>, {
                className: cn(
                  'nav-icon text-[var(--aiortho-gray-600)]',
                  isExpanded && 'text-[var(--aiortho-gray-700)] font-bold',
                  isActive && 'text-[var(--aiortho-gray-700)]'
                ),
              })
            )}
          </div>
          <span
            className={cn(
              'overflow-hidden shrink-0 text-sm font-medium tracking-wide leading-6 whitespace-nowrap text-ellipsis w-[104px] text-left max-md:text-sm max-sm:text-xs text-[var(--aiortho-gray-600)]',
              isExpanded && 'text-[var(--aiortho-gray-700)] font-bold',
              isActive && 'text-[var(--aiortho-gray-700)] font-bold'
            )}
          >
            {label}
          </span>
        </div>

        <ChevronRight
          className={cn(
            'w-5 h-5 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] transform text-[var(--aiortho-gray-600)]',
            isExpanded ? 'rotate-90 text-[var(--aiortho-gray-700)]' : '-rotate-90 ',
            isActive && 'text-[var(--aiortho-gray-700)]'
          )}
        />
      </button>
      {isExpanded && (
        <ul
          id={`section-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="flex flex-col gap-2"
          role="region"
          aria-labelledby={`section-${label.replace(/\s+/g, '-').toLowerCase()}-heading`}
        >
          {children}
        </ul>
      )}
    </li>
  );
};

export default NavSection;
