import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Show current page and surrounding pages
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    // Add ellipsis if needed
    if (startPage > 2) {
      pages.push('...');
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex mt-6 items-start gap-1 justify-start">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg flex min-h-8 p-2 flex-col items-center justify-center w-8 disabled:opacity-50"
      >
        <img
          src="/icons/chevron-left.svg"
          alt="Previous"
          className="aspect-square object-contain w-4"
        />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => (typeof page === 'number' ? handlePageChange(page) : null)}
          className={`min-h-8 px-[10px] py-2 font-pretendard text-[13px] w-8 h-8 ${
            page === currentPage
              ? 'bg-[#DADFE9] text-[#465463] font-bold rounded-full'
              : 'text-[#8395AC] font-semibold rounded-lg'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg flex min-h-8 p-2 flex-col items-center justify-center w-8 rotate-180 disabled:opacity-50"
      >
        <img
          src="/icons/chevron-left.svg"
          alt="Next"
          className="aspect-square object-contain w-4"
        />
      </button>
    </div>
  );
};

export default Pagination;
