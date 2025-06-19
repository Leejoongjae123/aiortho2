'use client';
import React from 'react';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <li className="relative w-full">
      <button
        className={`flex items-center w-full h-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 max-md:h-11 max-sm:h-10 ${
          isActive ? 'font-bold text-sky-700' : 'font-medium text-slate-500'
        }`}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
      >
        {isActive && (
          <div className="absolute top-0 left-6 w-48 h-12 bg-indigo-50 rounded-xl max-md:left-5 max-md:w-40 max-sm:left-4 max-sm:w-[calc(100%_-_48px)] max-md:h-11 max-sm:h-10" />
        )}
        <div className="flex absolute top-3.5 left-10 gap-2 items-center h-5 max-md:top-3 max-md:left-8 max-sm:top-2.5 max-sm:left-6 z-10">
          <div className="flex-shrink-0">
            {typeof icon === 'string' ? <div dangerouslySetInnerHTML={{ __html: icon }} /> : icon}
          </div>
          <span className="overflow-hidden shrink-0 h-5 text-sm tracking-wide leading-6 whitespace-nowrap text-ellipsis w-[104px] text-left max-md:text-sm max-sm:text-xs">
            {label}
          </span>
        </div>
      </button>
    </li>
  );
};

export default NavItem;
