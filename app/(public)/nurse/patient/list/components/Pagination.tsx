import React from 'react';

const Pagination = () => {
  return (
    <div className="flex items-center gap-1 justify-start w-full mx-auto w-full">
      {/* Previous Page Button */}
      <button className="rounded-lg flex min-h-8 px-2 py-2 flex-col items-center justify-center w-8 hover:bg-gray-100 transition-colors cursor-pointer">
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
      </button>

      {/* Page 1 (Active) */}
      <button className="text-[#465463] rounded-full min-h-8 px-2.5 text-sm font-bold whitespace-nowrap w-8 h-8 flex items-center justify-center bg-[#DADFE9] sm:whitespace-normal">
        1
      </button>

      {/* Page 2 */}
      <button className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer sm:whitespace-normal">
        2
      </button>

      {/* Page 3 */}
      <button className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer sm:whitespace-normal">
        3
      </button>

      {/* Page 4 */}
      <button className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer sm:whitespace-normal">
        4
      </button>

      {/* Ellipsis */}
      <div className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center sm:whitespace-normal">
        ...
      </div>

      {/* Last Page */}
      <button className="text-[#8395AC] rounded-lg min-h-8 px-1.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer sm:whitespace-normal">
        197
      </button>

      {/* Next Page Button */}
      <button className="transform rotate-180 rounded-lg flex min-h-8 px-2 py-2 flex-col items-center justify-center w-8 hover:bg-gray-100 transition-colors cursor-pointer">
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
      </button>
    </div>
  );
};

export default Pagination;
