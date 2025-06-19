import React from 'react';
import QuickMenuCard from './QuickMenuCard';
import { PrescriptionIcon, PatientRegistrationIcon } from './Icons';

const QuickMenu: React.FC = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
      <QuickMenuCard
        subtitle="처음 진료 받는"
        title="환자 등록하기"
        icon={<img className="w-15 h-15 cursor-pointer" src="/icon.png" alt="환자 등록" />}
      />
    </section>
  );
};

export default QuickMenu;
