import React from 'react';

interface CalendarNavigationProps {
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex items-center gap-4 mb-5">
      <button onClick={onPrevMonth} className="cursor-pointer" aria-label="Previous month">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7008 17.8086C14.9229 17.5684 14.9065 17.195 14.6642 16.9748L9.19048 12L14.6642 7.02521C14.9065 6.80497 14.9229 6.43165 14.7008 6.19138C14.4786 5.95111 14.1021 5.93488 13.8598 6.15513L8.38604 11.1299C7.87132 11.5977 7.87132 12.4023 8.38604 12.8701L13.8598 17.8449C14.1021 18.0651 14.4786 18.0489 14.7008 17.8086Z"
            fill="#66798D"
            stroke="#66798D"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="flex-1 text-center text-[#161621] text-base font-medium">{currentMonth}</div>

      <button onClick={onNextMonth} className="cursor-pointer" aria-label="Next month">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.29924 17.8086C9.07711 17.5684 9.09347 17.195 9.33581 16.9748L14.8095 12L9.33581 7.02521C9.09347 6.80497 9.07711 6.43165 9.29924 6.19138C9.52138 5.95111 9.89791 5.93488 10.1402 6.15513L15.614 11.1299C16.1287 11.5977 16.1287 12.4023 15.614 12.8701L10.1402 17.8449C9.89791 18.0651 9.52138 18.0489 9.29924 17.8086Z"
            fill="#97A8C4"
            stroke="#97A8C4"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default CalendarNavigation;
