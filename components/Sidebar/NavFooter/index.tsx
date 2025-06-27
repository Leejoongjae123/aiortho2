'use client';
import React from 'react';
import { NavFooterProps } from '../types';

const NavFooter: React.FC<NavFooterProps> = ({ items }) => {
  return (
    <section className="w-full" aria-label="Additional information">
      <ul className="flex flex-col items-start w-full">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col justify-center items-start w-full h-10">
            <button
              className="w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 relative"
              onClick={item.onClick}
            >
              <span className="overflow-hidden absolute left-10 shrink-0 w-40 h-5 text-sm leading-5 whitespace-nowrap text-ellipsis text-slate-400 max-md:left-8 max-md:text-xs max-sm:left-6 max-sm:text-xs">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NavFooter;
