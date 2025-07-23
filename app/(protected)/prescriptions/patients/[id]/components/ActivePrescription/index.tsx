import { Button } from '@/components/ui/button';
import PrescriptionProgramCard from '@/components/PrescriptionProgramCard';
import { Prescription } from '@/models';
import { formatDate } from '@/lib/utils';

interface ActivePrescriptionProps {
  prescription?: Prescription;
}

export default function ActivePrescription({ prescription }: ActivePrescriptionProps) {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-9">
          <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
            진행중 처방 내역
          </span>
          <span className="text-[var(--aiortho-gray-600)] text-base font-normal leading-none mt-3">
            현재 치료 진행중인 재활 프로그램 처방 내역입니다.
          </span>
        </div>

        <Button size="lg" className="w-full mb-5 md:w-auto cursor-pointer">
          처방하기
        </Button>
      </div>

      {prescription ? (
        <div className="flex flex-col gap-3">
          <span className="text-[var(--aiortho-gray-600)]">
            {formatDate(prescription.startDate, true)}
          </span>

          <PrescriptionProgramCard prescription={prescription} disabled />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-25">
          <span className="text-[var(--aiortho-gray-500)] ">처방된 내역이 없어요</span>
        </div>
      )}
    </div>
  );
}
