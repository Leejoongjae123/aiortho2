import React from 'react';

interface MedicalInstitutionPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MedicalInstitutionPagination: React.FC<MedicalInstitutionPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container inline-flex items-start gap-1 absolute left-8 top-[576px] w-[284px] h-8 md:left-8 md:w-[calc(100%-64px)] sm:left-4 sm:w-[calc(100%-32px)] sm:justify-center">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="pagination-button flex w-8 h-8 p-2.5 flex-col justify-center items-center gap-2.5 rounded-lg"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.58974 11.5297C9.84946 11.7895 10.2705 11.7895 10.5303 11.5297V11.5297C10.7898 11.2702 10.79 10.8495 10.5308 10.5897L7.94667 8L10.5308 5.41026C10.79 5.15046 10.7898 4.72977 10.5303 4.47026V4.47026C10.2705 4.21054 9.84946 4.21054 9.58974 4.47026L6.48895 7.57105C6.25205 7.80795 6.25205 8.19205 6.48895 8.42895L9.58974 11.5297Z"
            fill={currentPage === 1 ? '#B6C2D9' : '#66798D'}
          />
        </svg>
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => (typeof page === 'number' ? onPageChange(page) : null)}
          className={`pagination-number w-8 h-8 p-2.5 gap-2.5 rounded-lg text-sm font-${
            currentPage === page ? '700' : '600'
          } ${currentPage === page ? 'text-[#465463]' : 'text-[#8395AC]'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="pagination-button flex w-8 h-8 p-2.5 flex-col justify-center items-center gap-2.5 rounded-lg"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.41026 11.5297C6.15054 11.7895 5.72946 11.7895 5.46974 11.5297V11.5297C5.21023 11.2702 5.21 10.8495 5.46923 10.5897L8.05333 8L5.46923 5.41026C5.21 5.15046 5.21023 4.72977 5.46974 4.47026V4.47026C5.72946 4.21054 6.15054 4.21054 6.41026 4.47026L9.51105 7.57105C9.74795 7.80795 9.74795 8.19205 9.51105 8.42895L6.41026 11.5297Z"
            fill={currentPage === totalPages ? '#B6C2D9' : '#66798D'}
          />
        </svg>
      </button>
    </div>
  );
};

export default MedicalInstitutionPagination;
