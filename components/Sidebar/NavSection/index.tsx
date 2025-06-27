'use client';
import React, { useState } from 'react';
import { NavSectionProps } from '../types';

const NavSection: React.FC<NavSectionProps> = ({
  icon,
  label,
  children,
  isExpanded: initialExpanded = false,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) onToggle();
  };

  return (
    <li className="relative w-full">
      <button
        className="flex items-center w-full h-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 max-md:h-11 max-sm:h-10 relative"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={`section-${label.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex absolute top-3.5 left-10 gap-2 items-center h-5 w-[132px] max-md:top-3 max-md:left-8 max-sm:top-2.5 max-sm:left-6">
          <div className="flex-shrink-0">
            {typeof icon === 'string' ? <div dangerouslySetInnerHTML={{ __html: icon }} /> : icon}
          </div>
          <span className="overflow-hidden shrink-0 h-5 text-sm text-left font-medium tracking-wide leading-6 whitespace-nowrap text-ellipsis text-slate-500 w-[104px] max-md:text-sm max-sm:text-xs">
            {label}
          </span>
        </div>
        <div className="absolute right-9 top-3">
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg layer-name="icon/normal" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="expand-icon"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2355 10.1141C16.0603 9.95211 15.7881 9.96405 15.6275 10.1407L12 14.132L8.37263 10.1407C8.21204 9.96405 7.93983 9.95211 7.76464 10.1141C7.58945 10.2761 7.57761 10.5506 7.7382 10.7273L11.3656 14.7185C11.7067 15.0938 12.2934 15.0938 12.6345 14.7185L16.2619 10.7273C16.4225 10.5506 16.4106 10.2761 16.2355 10.1141Z" fill="#8395AC" stroke="#8395AC" stroke-width="0.75" stroke-linecap="round"></path> </svg>',
            }}
          />
        </div>
      </button>
      {isExpanded && (
        <ul
          id={`section-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="w-full"
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
