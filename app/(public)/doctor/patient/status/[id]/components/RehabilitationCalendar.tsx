'use client';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import CalendarNavigation from './CalendarNavigation';
import CalendarGrid from './CalendarGrid';

const RehabilitationCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('2024년 10월');

  const handlePrevMonth = () => {
    // In a real implementation, this would update the month
    console.log('Navigate to previous month');
  };

  const handleNextMonth = () => {
    // In a real implementation, this would update the month
    console.log('Navigate to next month');
  };

  return (
    <div className="w-full ">
      {/* Progress Bar Section */}
      <div className="w-full">
        <ProgressBar totalDays={12} completedDays={10} progressPercentage={48} />
      </div>

      {/* Total Time Statistics */}
      <div className="mt-9 w-full">
        <div className="flex items-center gap-2">
          <span className="text-[#161621] text-xl font-semibold leading-6 tracking-[0.2px]">
            총 30일 / 72분 14초
          </span>
          <span className="text-[#8395AC] text-base font-normal leading-6 tracking-[0.16px]">
            (평균 35분 18초)
          </span>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-5 w-full bg-[#FAFBFC] rounded-xl p-6">
        <CalendarNavigation
          currentMonth={currentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <CalendarGrid />
      </div>
    </div>
  );
};

export default RehabilitationCalendar;
