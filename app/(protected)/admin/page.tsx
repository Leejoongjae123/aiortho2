'use client';

import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DoctorRegistrationDashboard, IssueCodeModal } from './components';

export default function AdminPage() {
  const router = useRouter();
  const { auth } = useAuthStore();
  const [isIssueCodeModalOpen, setIsIssueCodeModalOpen] = useState(false);

  const isRoot = auth?.role === 'Root';

  if (!isRoot) {
    router.replace('/home');
  }

  const handleIssueCode = () => {
    setIsIssueCodeModalOpen(true);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex w-full flex-col md:flex-row gap-2 md:gap-0 justify-between md:jitems-center">
        <div className="flex w-full items-center gap-5">
          <h2 className="text-2xl font-bold text-[var(--aiortho-gray-900)] lg:text-3xl">
            의사 관리
          </h2>
          <span className="text-[var(--aiortho-gray-600)] text-xl font-medium leading-none lg:text-2xl">
            {'(최근 3개월 기준)'}
          </span>
        </div>

        <Button type="button" className="cursor-pointer h-12" onClick={handleIssueCode}>
          가입 코드 발급
        </Button>
      </div>

      <DoctorRegistrationDashboard />

      <IssueCodeModal
        isOpen={isIssueCodeModalOpen}
        onClose={() => setIsIssueCodeModalOpen(false)}
      />
    </section>
  );
}
