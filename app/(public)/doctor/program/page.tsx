'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProgramCard from '@/components/ProgramCard';
import { Button } from '@/components/ui/button';
import DeleteProgramModal from './components/DeleteProgramModal';

interface Exercise {
  id: string;
  name: string;
  exerciseType?: string;
  muscleDirection?: string;
  duration?: string;
}

interface Program {
  id: string;
  title: string;
  exercises: Exercise[];
  repetitionCount: number;
}

export default function ProgramPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      title: 'Non-Mass (Lt)',
      repetitionCount: 3,
      exercises: [
        {
          id: '1-1',
          name: '재활 운동 1',
          exerciseType: '옆쪽 목 늘리기 스트레칭 (Lateral Flexion Strectching)',
          muscleDirection: 'left',
          duration: '3분',
        },
        {
          id: '1-2',
          name: '재활 운동 2',
          exerciseType: '고개 돌리기 스트레칭 (Rotation Strectching)',
          muscleDirection: 'left',
          duration: '3분',
        },
        {
          id: '1-3',
          name: '재활 운동 3',
          exerciseType: '정위반응을 이용한 근력운동 (Strengthening)',
          muscleDirection: 'right',
          duration: '2분',
        },
        {
          id: '1-4',
          name: '재활 운동 4',
          exerciseType: '몸통 스트레칭 (Trunk Stretching)',
          muscleDirection: 'left',
          duration: '2분',
        },
      ],
    },
    {
      id: '2',
      title: 'Non-Mass (Rt)',
      repetitionCount: 5,
      exercises: [
        {
          id: '2-1',
          name: '재활 운동 1',
          exerciseType: '옆쪽 목 늘리기 스트레칭 (Lateral Flexion Strectching)',
          muscleDirection: 'right',
          duration: '3분',
        },
      ],
    },
    {
      id: '3',
      title: 'Mass torticollis (Lt)',
      repetitionCount: 5,
      exercises: [
        {
          id: '3-1',
          name: '재활 운동 1',
          exerciseType: '고개 돌리기 스트레칭 (Rotation Strectching)',
          muscleDirection: 'left',
          duration: '3분',
        },
      ],
    },
    {
      id: '4',
      title: 'Mass torticollis (Rt)',
      repetitionCount: 5,
      exercises: [
        {
          id: '4-1',
          name: '재활 운동 1',
          exerciseType: '몸통 스트레칭 (Trunk Stretching)',
          muscleDirection: 'right',
          duration: '2분',
        },
      ],
    },
  ]);

  const handleProgramDelete = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    if (program) {
      setProgramToDelete(program);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (programToDelete) {
      setPrograms(programs.filter(program => program.id !== programToDelete.id));
      setIsDeleteModalOpen(false);
      setProgramToDelete(null);
    }
  };

  const handleProgramEdit = (programId: string) => {
    // 편집 로직 구현
    console.log('Edit program:', programId);
  };

  const handleExerciseDelete = (programId: string, exerciseId: string) => {
    setPrograms(
      programs.map(program =>
        program.id === programId
          ? {
              ...program,
              exercises: program.exercises.filter(exercise => exercise.id !== exerciseId),
            }
          : program
      )
    );
  };

  const handleRepetitionChange = (programId: string, count: number) => {
    setPrograms(
      programs.map(program =>
        program.id === programId ? { ...program, repetitionCount: count } : program
      )
    );
  };

  const handleAddProgram = () => {
    // 최대 6개까지만 추가 가능
    if (programs.length >= 6) {
      return;
    }

    // 새로운 프로그램 ID 생성 (기존 프로그램 수 + 1)
    const newProgramId = (programs.length + 1).toString();
    const programNumber = programs.length - 3; // 기본 4개 프로그램 이후부터 1번 시작

    const newProgram: Program = {
      id: newProgramId,
      title: `표준 프로그램${programNumber}`,
      repetitionCount: 3,
      exercises: [
        {
          id: `${newProgramId}-1`,
          name: '재활 운동 1',
          exerciseType: '옆쪽 목 늘리기 스트레칭 (Lateral Flexion Strectching)',
          muscleDirection: 'left',
          duration: '3분',
        },
        {
          id: `${newProgramId}-2`,
          name: '재활 운동 2',
          exerciseType: '고개 돌리기 스트레칭 (Rotation Strectching)',
          muscleDirection: 'left',
          duration: '3분',
        },
        {
          id: `${newProgramId}-3`,
          name: '재활 운동 3',
          exerciseType: '정위반응을 이용한 근력운동 (Strengthening)',
          muscleDirection: 'right',
          duration: '2분',
        },
        {
          id: `${newProgramId}-4`,
          name: '재활 운동 4',
          exerciseType: '몸통 스트레칭 (Trunk Stretching)',
          muscleDirection: 'left',
          duration: '2분',
        },
      ],
    };

    setPrograms([...programs, newProgram]);
  };

  return (
    <div className="bg-white px-4 flex pt-4 md:pt-[52px] pb-[168px] flex-col overflow-x-hidden items-center justify-center md:px-5">
      <div className="flex w-full max-w-[960px] flex-col items-stretch">
        <h1 className="text-[#161621] self-start gap-4 font-pretendard text-[32px] font-bold leading-none">
          표준 치료 프로그램
        </h1>
        <p className="text-[#66798D] font-pretendard text-[17px] font-normal leading-none self-start mt-5">
          프로그램의 개별 프로그램 생성을 미리 세팅할 수 있어요
        </p>

        <div className="self-start flex mt-[53px] items-center gap-2 font-pretendard text-[20px] font-bold whitespace-nowrap leading-none justify-start md:mt-10 md:whitespace-normal">
          <div className="text-[#161621] self-stretch my-auto">프로그램</div>
          <div className="self-stretch flex my-auto items-center justify-start md:whitespace-normal">
            <div className="text-[#0054A6] self-stretch my-auto">{programs.length}</div>
            <div className="text-[#161621] self-stretch my-auto">개</div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="flex mt-12 w-full flex-col gap-3 md:max-w-full md:mt-10">
          {programs.map((program, index) => (
            <div key={program.id}>
              <ProgramCard
                title={program.title}
                exercises={program.exercises}
                repetitionCount={program.repetitionCount}
                onDelete={() => handleProgramDelete(program.id)}
                onEdit={() => handleProgramEdit(program.id)}
                onExerciseDelete={exerciseId => handleExerciseDelete(program.id, exerciseId)}
                onRepetitionChange={count => handleRepetitionChange(program.id, count)}
              />

              {/* 마지막 카드에만 프로그램 추가 버튼 표시 */}
              {index === programs.length - 1 && (
                <div className="mt-4 font-pretendard w-full">
                  <div className="w-full">
                    <div className="min-h-[72px] w-full max-w-[960px]">
                      <div className="w-full md:w-5/6 my-4">
                        <Button
                          onClick={handleAddProgram}
                          className="justify-center items-center rounded-xl border border-[#0054A6] bg-transparent hover:bg-[#0054A6]/10 flex min-h-[48px] w-full py-3 gap-1 text-base text-[#0054A6] font-semibold text-center flex-wrap"
                        >
                          <Plus className="w-6 h-6 text-[#0054A6] flex-shrink-0 self-stretch my-auto" />
                          <span className="text-[#0054A6] self-stretch my-auto">프로그램 추가</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Program Modal */}
      <DeleteProgramModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        programTitle={programToDelete ? `표준 프로그램 ${programToDelete.title}` : ''}
      />
    </div>
  );
}
