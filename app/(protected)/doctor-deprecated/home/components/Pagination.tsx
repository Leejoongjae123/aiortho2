import React from 'react';

const Pagination = () => {
  return (
    <div className="self-start flex items-start gap-1 justify-start w-full">
      {/* Previous Page Button */}
      <div className="rounded-lg flex min-h-8 px-2 py-2 flex-col items-center justify-center w-8">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="#8395AC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Page 1 (Active) */}
      <div className="text-[#465463] rounded-full min-h-8 px-2.5 text-sm font-bold whitespace-nowrap w-8 h-8 flex items-center justify-center bg-[#DADFE9] sm:whitespace-normal">
        1
      </div>

      {/* Page 2 */}
      <div className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center sm:whitespace-normal">
        2
      </div>

      {/* Page 3 */}
      <div className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center sm:whitespace-normal">
        3
      </div>

      {/* Page 4 */}
      <div className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center sm:whitespace-normal">
        4
      </div>

      {/* Ellipsis */}
      <div className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center sm:whitespace-normal">
        ...
      </div>

      {/* Last Page */}
      <div className="text-[#8395AC] rounded-lg min-h-8 px-1.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center sm:whitespace-normal">
        197
      </div>

      {/* Next Page Button */}
      <div className="transform rotate-180 rounded-lg flex min-h-8 px-2 py-2 flex-col items-center justify-center w-8">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="#8395AC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
