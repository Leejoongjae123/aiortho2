'use client';

import { useEffect, useState } from 'react';
import { useStandardProgram } from '@/hooks';
import { Prescription } from '@/models';
import PrescriptionProgramCard from '@/components/PrescriptionProgramCard';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { createDefaultExercise } from '@/components/PrescriptionProgramCard/utils';

export default function StandardTreatmentProgramPage() {
  const standardProgramQuery = useStandardProgram();
  const [standardProgram, setStandardProgram] = useState<Prescription[]>([]);
  const [currentCustomStandardProgramNumber, setCurrentCustomStandardProgramNumber] =
    useState<number>(1);
  const [editingPrograms, setEditingPrograms] = useState<boolean[]>([]);

  const handleAddCustomStandardProgramClick = () => {
    setStandardProgram(prev => [
      ...prev,
      {
        name: `표준 프로그램 ${currentCustomStandardProgramNumber}`,
        exercises: [createDefaultExercise()],
        repeatCount: 3,
      },
    ]);

    setCurrentCustomStandardProgramNumber(currentCustomStandardProgramNumber + 1);
    setEditingPrograms(prev => [...prev, true]);
  };

  const handleStartEditing = (index: number) => {
    setEditingPrograms(prev => prev.map((isEditing, i) => (i === index ? true : isEditing)));
  };

  const handleStopEditing = (index: number) => {
    setEditingPrograms(prev => prev.map((isEditing, i) => (i === index ? false : isEditing)));
  };

  const handleUpdateProgram = (program: Prescription, index: number) => {
    setStandardProgram(prev => prev.map((p, i) => (i === index ? { ...p, ...program } : p)));
  };

  const handleDeleteProgram = (index: number) => {
    setStandardProgram(prev => prev.filter((_, i) => i !== index));
    setEditingPrograms(prev => prev.filter((_, i) => i !== index));

    if (standardProgram[index].name.includes('표준 프로그램')) {
      setCurrentCustomStandardProgramNumber(currentCustomStandardProgramNumber - 1);
    }
  };

  const isAnyProgramEditing = editingPrograms.some(Boolean);

  useEffect(() => {
    if (standardProgramQuery.data) {
      setStandardProgram(standardProgramQuery.data.presets);
      setEditingPrograms(standardProgramQuery.data.presets.map(() => false));
    }
  }, [standardProgramQuery.data]);

  return (
    <section className="flex flex-col max-w-[680px]">
      <h1 className="text-3xl font-bold text-[var(--aiortho-gray-900)] mb-5">표준 치료 프로그램</h1>
      <h2 className=" text-[var(--aiortho-gray-600)] mb-13">
        프로그램의 개별 프로그램 생성을 미리 세팅할 수 있어요
      </h2>

      <div className="flex text-xl text-[var(--aiortho-gray-900)] font-bold mb-4">
        <span className="mr-2">프로그램</span>
        <span className="text-[var(--aiortho-primary)]">{standardProgram.length}</span>
        <span>개</span>
      </div>

      <div className="flex flex-col gap-3">
        {standardProgram.map((program, idx) => (
          <PrescriptionProgramCard
            key={`${program.name}-${idx}`}
            prescription={program}
            isEditing={editingPrograms[idx]}
            onStartEditing={() => handleStartEditing(idx)}
            onStopEditing={() => handleStopEditing(idx)}
            onUpdate={program => handleUpdateProgram(program, idx)}
            onDelete={() => handleDeleteProgram(idx)}
            defaultIsOpen={program.name.includes('표준 프로그램')}
            showControl={!isAnyProgramEditing}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full h-12"
          onClick={handleAddCustomStandardProgramClick}
          disabled={isAnyProgramEditing}
        >
          <PlusIcon size={24} className="text-[var(--aiortho-primary)]" />
          <span className="font-semibold text-base">프로그램 추가</span>
        </Button>
      </div>
    </section>
  );
}
