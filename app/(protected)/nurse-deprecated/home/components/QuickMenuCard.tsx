import React, { ReactNode } from 'react';

interface QuickMenuCardProps {
  subtitle: string;
  title: string;
  icon: ReactNode;
}

const QuickMenuCard: React.FC<QuickMenuCardProps> = ({ subtitle, title, icon }) => {
  return (
    <article className="flex flex-col gap-2.5 items-start px-6 py-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 min-h-[120px] w-full sm:px-8 sm:py-7">
      <div className="flex gap-4 items-center justify-between w-full sm:gap-8 lg:gap-16">
        <div className="flex flex-col gap-2 items-start flex-1 sm:gap-3">
          <p className="text-sm text-slate-400 sm:text-base">{subtitle}</p>
          <h3 className="text-lg font-bold tracking-wider text-gray-700 sm:text-xl lg:text-2xl">
            {title}
          </h3>
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>
    </article>
  );
};

export default QuickMenuCard;
