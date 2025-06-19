'use client';
import React from 'react';
import NurseManager from './components/NurseManager';

const NurseManagerWrapper = ({ label, cta }: { label: string; cta: string }) => {
  return <NurseManager label={label} cta={cta} required />;
};

export default NurseManagerWrapper;
