'use client';
import React, { useState } from 'react';
import PatientListHeader from './PatientListHeader';
import PatientListSheet from './PatientListSheet';
import Pagination from './Pagination';

export default function PatientListContainer() {
  const [showOnlyMyPatients, setShowOnlyMyPatients] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      {/* Header Section */}
      <div className="mb-8 w-full">
        <PatientListHeader />
      </div>

      {/* Patient List Sheet */}
      <div className="mb-8 w-full">
        <PatientListSheet
          showOnlyMyPatients={showOnlyMyPatients}
          setShowOnlyMyPatients={setShowOnlyMyPatients}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination />
      </div>
    </div>
  );
}
