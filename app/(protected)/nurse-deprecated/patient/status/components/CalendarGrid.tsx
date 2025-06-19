import React from 'react';

interface DayProps {
  day: number;
  status?: 'normal' | 'error' | 'warning' | 'success' | 'disabled';
}

// 타입 정의 추가
interface CalendarDay {
  day: number;
  status: 'normal' | 'error' | 'warning' | 'success' | 'disabled';
}

const Day: React.FC<DayProps> = ({ day, status = 'normal' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'error':
        return '#FF0D4E';
      case 'warning':
        return '#FFAE00';
      case 'success':
        return '#2DD06E';
      default:
        return undefined;
    }
  };

  const textColor = status === 'disabled' ? '#B6C2D9' : '#465463';
  const statusColor = getStatusColor();

  return (
    <div className="flex-1 h-8 flex justify-center items-center relative cursor-pointer md:h-7">
      <span className={`text-base font-normal text-center md:text-sm`} style={{ color: textColor }}>
        {day}
      </span>
      {statusColor && (
        <div
          className="absolute bottom-[3px] left-1/2 transform translate-y-1.5 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: statusColor }}
        />
      )}
    </div>
  );
};

const CalendarGrid: React.FC = () => {
  // Sample data for the calendar
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Sample calendar data with status - 타입 명시적 정의
  const calendarData: CalendarDay[][] = [
    [
      { day: 1, status: 'normal' },
      { day: 2, status: 'error' },
      { day: 3, status: 'warning' },
      { day: 4, status: 'normal' },
      { day: 5, status: 'normal' },
      { day: 6, status: 'normal' },
      { day: 7, status: 'normal' },
    ],
    [
      { day: 8, status: 'normal' },
      { day: 9, status: 'normal' },
      { day: 10, status: 'normal' },
      { day: 11, status: 'normal' },
      { day: 12, status: 'normal' },
      { day: 13, status: 'normal' },
      { day: 14, status: 'normal' },
    ],
    [
      { day: 15, status: 'normal' },
      { day: 16, status: 'normal' },
      { day: 17, status: 'normal' },
      { day: 18, status: 'success' },
      { day: 19, status: 'disabled' },
      { day: 20, status: 'disabled' },
      { day: 21, status: 'disabled' },
    ],
    [
      { day: 22, status: 'disabled' },
      { day: 23, status: 'disabled' },
      { day: 24, status: 'disabled' },
      { day: 25, status: 'disabled' },
      { day: 26, status: 'disabled' },
      { day: 27, status: 'disabled' },
      { day: 28, status: 'disabled' },
    ],
    [
      { day: 29, status: 'disabled' },
      { day: 30, status: 'disabled' },
      { day: 31, status: 'disabled' },
      { day: 1, status: 'disabled' },
      { day: 2, status: 'disabled' },
      { day: 3, status: 'disabled' },
      { day: 4, status: 'disabled' },
    ],
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Weekday headers */}
      <div className="flex justify-between items-center h-7 w-full">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="flex-1 text-center text-[#8395AC] text-sm font-normal uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="flex flex-col gap-1 w-full">
        {calendarData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex justify-between items-center w-full">
            {week.map((day, dayIndex) => (
              <Day key={dayIndex} day={day.day} status={day.status} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
