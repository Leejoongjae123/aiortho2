'use client';

import { Button } from '../ui/button';
import PatientTable from './PatientTable';

interface PatientDashboardProps {}

const PatientDashboard = ({}: PatientDashboardProps) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex w-full flex-col md:flex-row gap-2 md:gap-0 justify-between md:jitems-center">
        <div className="flex w-full items-center gap-5">
          <h2 className="text-2xl font-bold text-[var(--aiortho-gray-900)] lg:text-3xl">
            환자 명단
          </h2>
          <span className="text-[var(--aiortho-gray-600)] text-xl font-medium leading-none lg:text-2xl">
            {'(최근 3개월 기준)'}
          </span>
        </div>

        <Button type="button" className="cursor-pointer">
          환자 등록하기
        </Button>
      </div>

      <PatientTable />
    </section>
  );
};

export default PatientDashboard;
