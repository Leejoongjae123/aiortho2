'use client';
import React from 'react';
import DoctorHeader from './DoctorHeader';
import QuickMenu from './QuickMenu';
import Pagination from './Pagination';
import Sheet from './Table/Sheet';

const DoctorDashboard: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[#F5F9FF]">
      <div className="px-4 py-8 sm:px-6 lg:px-8 w-full">
        {/* Header Section */}
        <div className="mb-8">
          <DoctorHeader />
        </div>

        {/* Divider */}
        <div className="mb-8">
          <div className="w-full h-px bg-slate-200"></div>
        </div>

        {/* Quick Menu Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 lg:text-3xl">Quick Menu</h2>
          <QuickMenu />
        </div>

        {/* Prescription Table Section */}
        <div className="mb-8">
          <Sheet />
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
