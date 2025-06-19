'use client';
import React from 'react';
import MedicalInstitutionSelector from './components/MedicalInstitutionSelector';

const MedicalInstitution = ({ label, cta }: { label: string; cta: string }) => {
  return <MedicalInstitutionSelector label={label} cta={cta} required />;
};

export default MedicalInstitution;
