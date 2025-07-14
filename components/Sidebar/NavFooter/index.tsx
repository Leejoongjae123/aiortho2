'use client';
import React from 'react';
import { NavFooterProps } from '../types';

const NavFooter: React.FC<NavFooterProps> = ({ items }) => {
  return (
    <section className="w-full" aria-label="Additional information">
      <ul className="flex flex-col items-start w-full gap-1">
        {items.map((item, index) => (
          <li key={index} className="w-full">
            <button
              className="w-full h-10 text-left focus:outline-none focus:ring-2 focus:ring-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg px-4 hover:bg-gray-50 transition-colors"
              onClick={item.onClick}
            >
              <span className="text-sm leading-5 text-slate-500 hover:text-slate-700 transition-colors">
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
