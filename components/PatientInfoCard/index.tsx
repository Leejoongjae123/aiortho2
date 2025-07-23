import { Patient, PrescriptionStatus, PrescriptionStatusLabel } from '@/models';
import Divider from '@/components/Divider';
import StatusToggle from '../ui/status-toggle';
import EditIcon from './icon';
import { formatPhoneNumber } from '@/lib/utils';

interface PatientInfoCardProps {
  patient: Patient;
  hidePrescription?: boolean;
}

const statusOptions = [
  {
    value: PrescriptionStatus.Not_Created,
    label: PrescriptionStatusLabel[PrescriptionStatus.Not_Created],
    activeClassName: 'bg-[#0D8EFF]',
  },
  {
    value: PrescriptionStatus.Pending,
    label: PrescriptionStatusLabel[PrescriptionStatus.Pending],
    activeClassName: 'bg-[#2DD06E]',
  },
  {
    value: PrescriptionStatus.Prescripted,
    label: PrescriptionStatusLabel[PrescriptionStatus.Prescripted],
    activeClassName: 'bg-[var(--aiortho-gray-600)]',
  },
];

export default function PatientInfoCard({
  patient,
  hidePrescription = false,
}: PatientInfoCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-[#F7F9FB] w-full p-6 gap-5 lg:p-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex  gap-2 items-center shrink-0">
            <span className="font-bold text-2xl">{patient.name}</span>
            <span className="text-2xl">님</span>
            <div className="cursor-pointer hover:scale-120 transition-all duration-115">
              <EditIcon />
            </div>
          </div>

          {!hidePrescription && (
            <StatusToggle
              options={statusOptions}
              activeOption={patient.prescriptionStatus}
              className="max-w-[185px]"
              readOnly
            />
          )}
        </div>

        <div className="flex text-[var(--aiortho-gray-600)] gap-2 h-5">
          <span>병원 환자 번호</span>
          <span className="font-semibold">{patient.hospitalPatientNum}</span>
        </div>
      </div>

      <Divider className="bg-white" />

      <div className="flex justify-between text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[var(--aiortho-gray-600)] ">성별</span>
          <span className="text-[var(--aiortho-gray-800)] font-semibold">
            {patient.gender === 'M' ? `${patient.gender} (남성)` : `${patient.gender} (여성)`}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[var(--aiortho-gray-600)] ">생년월일</span>
          <span className="text-[var(--aiortho-gray-800)] font-semibold">
            {patient.birth ?? '-'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[var(--aiortho-gray-600)] ">보호자명</span>
          <span className="text-[var(--aiortho-gray-800)] font-semibold">
            {patient.guardianName ?? '-'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[var(--aiortho-gray-600)] ">보호자 휴대폰 번호</span>
          <span className="text-[var(--aiortho-gray-800)] font-semibold">
            {formatPhoneNumber(patient.guardianPhoneNum ?? '-')}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[var(--aiortho-gray-600)] ">라이센스번호</span>
          <span className="text-[var(--aiortho-gray-800)] font-semibold">
            {patient.license ?? '-'}
          </span>
        </div>
      </div>
    </div>
  );
}
