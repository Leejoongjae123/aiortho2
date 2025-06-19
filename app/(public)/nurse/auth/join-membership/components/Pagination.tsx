import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 6; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 5; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="self-start flex items-start gap-1 justify-start">
      {/* Previous Page Button */}
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`rounded-lg flex min-h-8 px-2 py-2 flex-col items-center justify-center w-8 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
        }`}
      >
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

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <div className="text-[#8395AC] rounded-lg min-h-8 px-2.5 py-2 text-sm font-semibold whitespace-nowrap w-8 flex items-center justify-center sm:whitespace-normal">
              ...
            </div>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`min-h-8 px-2.5 text-sm font-semibold whitespace-nowrap w-8 h-8 flex items-center justify-center sm:whitespace-normal cursor-pointer ${
                currentPage === page
                  ? 'text-[#465463] rounded-full bg-[#DADFE9] font-bold'
                  : 'text-[#8395AC] rounded-lg py-2 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      {/* Next Page Button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`transform rotate-180 rounded-lg flex min-h-8 px-2 py-2 flex-col items-center justify-center w-8 ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-gray-100'
        }`}
      >
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
