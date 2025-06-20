'use client';
import QuickMenuCard from './QuickMenuCard';
import { PrescriptionIcon, PatientRegistrationIcon } from './Icons';
import { useRouter } from 'next/navigation';

const QuickMenu: React.FC = () => {
  const router = useRouter();

  const handlePrescriptionClick = (): void => {
    router.push('/doctor/quick');
  };

  const handlePatientRegistrationClick = (): void => {
    router.push('/doctor/patient/register');
  };

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
      <QuickMenuCard
        onClick={handlePrescriptionClick}
        subtitle="빠르고 간편하게"
        title="처방하기"
        icon={<PrescriptionIcon />}
      />
      <QuickMenuCard
        onClick={handlePatientRegistrationClick}
        subtitle="처음 진료 받는"
        title="환자 등록하기"
        icon={<img className="w-15 h-15 cursor-pointer" src="/icon.png" alt="환자 등록" />}
      />
    </section>
  );
};

export default QuickMenu;
