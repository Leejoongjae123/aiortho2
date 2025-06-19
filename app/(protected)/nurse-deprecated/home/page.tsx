'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import NurseDashboard from './components/NurseDashboard';
const NurseHomePage = () => {
  const router = useRouter();

  return (
    <div>
      <NurseDashboard />
    </div>
  );
};

export default NurseHomePage;
