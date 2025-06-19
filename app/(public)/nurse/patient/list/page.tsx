import React from 'react';
import PatientListContainer from './components/PatientListContainer';

export default function PatientListPage() {
  return (
    <div className="bg-[#F5F9FF] ">
      <div className="px-4 py-8 sm:px-6 lg:px-8 w-full">
        <PatientListContainer />
      </div>
    </div>
  );
}
