'use client';
import React from 'react';

interface SubNavItemProps {
  label: string;
  onClick?: () => void;
}

const SubNavItem: React.FC<SubNavItemProps> = ({ label, onClick }) => {
  return (
    <li className="relative w-full h-12 max-md:h-11 max-sm:h-10">
      <button
        className="w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
        onClick={onClick}
      >
        <span className=" absolute top-3.5 shrink-0 h-5 text-sm tracking-wide leading-6 whitespace-nowrap left-[68px] text-ellipsis text-slate-500 w-[104px] max-md:top-3 max-md:left-14 max-md:text-sm max-sm:top-2.5 max-sm:left-12 max-sm:text-xs">
          {label}
        </span>
      </button>
    </li>
  );
};

export default SubNavItem;
