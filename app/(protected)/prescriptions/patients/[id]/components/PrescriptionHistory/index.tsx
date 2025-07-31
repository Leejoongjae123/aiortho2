import PrescriptionProgramCard from '@/components/PrescriptionProgramCard';
import Pagination from '@/components/Pagination';
import { formatDate } from '@/lib/utils';
import { usePrescriptionHistory } from '../../hooks';
import { useState } from 'react';

interface PrescriptionHistoryProps {
  patientId: number;
}

const PER_PAGE_SIZE = 4;

export default function PrescriptionHistory({ patientId }: PrescriptionHistoryProps) {
  const [page, setPage] = useState(1);

  const prescriptionHistoryQuery = usePrescriptionHistory({
    patientId,
    params: { page, count: PER_PAGE_SIZE },
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (!prescriptionHistoryQuery.data) {
    return null;
  }

  const { prescriptions, pageCount } = prescriptionHistoryQuery.data;

  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-9">
          <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
            지난 처방 내역
          </span>
          <span className="text-[var(--aiortho-gray-600)] text-base font-normal leading-none mt-3">
            최근 5년간 재활 프로그램 처방 내역입니다.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-7 mb-9">
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, idx) => (
            <div key={`prescription-history-${idx}`} className="flex flex-col gap-3">
              {prescription.startDate && (
                <span className="text-[var(--aiortho-gray-600)]">
                  {formatDate(prescription.startDate, true)}
                </span>
              )}

              <PrescriptionProgramCard prescription={prescription} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-25">
            <span className="text-[var(--aiortho-gray-500)] ">처방된 내역이 없어요</span>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <Pagination currentPage={page} totalPages={pageCount} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
