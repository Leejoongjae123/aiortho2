'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash, Minus, Plus, Edit, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Exercise {
  id: string;
  name: string;
  exerciseType?: string;
  muscleDirection?: string;
  duration?: string;
}

interface ProgramCardProps {
  title: string;
  exercises: Exercise[];
  repetitionCount: number;
  onDelete?: () => void;
  onEdit?: () => void;
  onExerciseDelete?: (exerciseId: string) => void;
  onExerciseAdd?: () => void;
  onRepetitionChange?: (count: number) => void;
  onComplete?: () => void;
}

export default function ProgramCard({
  title,
  exercises,
  repetitionCount,
  onDelete,
  onEdit,
  onExerciseDelete,
  onExerciseAdd,
  onRepetitionChange,
  onComplete,
}: ProgramCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentRepetition, setCurrentRepetition] = useState(repetitionCount);

  const handleRepetitionDecrease = () => {
    if (currentRepetition > 3) {
      const newCount = currentRepetition - 1;
      setCurrentRepetition(newCount);
      onRepetitionChange?.(newCount);
    }
  };

  const handleRepetitionIncrease = () => {
    if (currentRepetition < 12) {
      const newCount = currentRepetition + 1;
      setCurrentRepetition(newCount);
      onRepetitionChange?.(newCount);
    }
  };

  const exerciseTypes = [
    '옆쪽 목 늘리기 스트레칭 (Lateral Flexion Strectching)',
    '고개 돌리기 스트레칭 (Rotation Strectching)',
    '정위반응을 이용한 근력운동 (Strengthening)',
    '몸통 스트레칭 (Trunk Stretching)',
  ];

  const durations = ['1분', '2분', '3분', '4분', '5분'];

  return (
    <div className="flex w-full items-start gap-x-7 gap-y-2 flex-col md:flex-row overflow-hidden">
      <div className="rounded-[20px] border border-[#F0F3FA] w-full overflow-hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="w-full md:max-w-full overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center gap-9 font-pretendard text-[18px] text-[#161621] font-semibold leading-[1.4] justify-between flex-wrap md:max-w-full h-[84px] px-6">
              <div className="text-[#161621] leading-tight flex-grow flex-shrink basis-0 min-w-0 truncate">
                {title}
              </div>
              <div className="flex items-center justify-center w-[35px] h-11 flex-shrink-0">
                {isOpen ? (
                  <ChevronUp className="w-6 h-6 text-[#8395AC]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#8395AC]" />
                )}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-5 w-full md:max-w-full p-6 overflow-hidden">
                <div className="w-full h-px bg-[#F0F3FA] md:max-w-full" />

                <div className="mt-5 w-full md:max-w-full space-y-9">
                  {exercises.map((exercise, index) => (
                    <div key={exercise.id} className="w-full md:max-w-full">
                      <div className="flex w-full items-center gap-4 md:gap-10 font-pretendard text-base text-[#161621] font-semibold leading-[2.5] justify-start flex-wrap md:max-w-full">
                        <div className="text-[#161621] self-stretch my-auto flex-grow flex-shrink basis-0 min-w-0 max-w-[calc(100%-40px)] md:w-[415px] md:max-w-none truncate">
                          {exercise.name}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0 p-0 h-auto"
                          onClick={() => onExerciseDelete?.(exercise.id)}
                        >
                          <X className="w-6 h-6 text-[#8395AC]" />
                        </Button>
                      </div>

                      <div className="mt-6 w-full md:max-w-full space-y-7">
                        {/* 운동 종류 선택 */}
                        <div className="w-full font-pretendard font-normal md:max-w-full">
                          <Label className="text-[#8395AC] text-sm leading-none md:max-w-full">
                            {index === 0 ? '스트레칭할 근육' : '운동 종류 선택'}
                          </Label>
                          <div className="mt-3 w-full">
                            <Select defaultValue={exercise.exerciseType}>
                              <SelectTrigger className="w-full min-h-[48px] rounded-xl border-[#DADFE9] bg-[rgba(240,243,250,0.60)] text-[#66798D] [&>span]:truncate [&>span]:pr-2">
                                <SelectValue
                                  placeholder="운동 종류를 선택하세요"
                                  className="truncate pr-2"
                                />
                              </SelectTrigger>
                              <SelectContent
                                className="max-w-[calc(100vw-2rem)] w-full z-50"
                                side="bottom"
                                align="start"
                                sideOffset={4}
                                position="popper"
                                avoidCollisions={true}
                                collisionPadding={8}
                              >
                                {exerciseTypes.map(type => (
                                  <SelectItem
                                    key={type}
                                    value={type}
                                    className="text-sm max-w-full"
                                  >
                                    <span className="block truncate pr-2 max-w-[calc(100vw-4rem)]">
                                      {type}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* 근육 방향 */}
                        <div className="flex w-full flex-col items-stretch justify-start md:max-w-full">
                          <Label className="text-[#8395AC] font-pretendard text-sm font-normal leading-none md:max-w-full">
                            {index === 0
                              ? '근육 방향'
                              : index === 1
                                ? '회전 방향 (스트레칭할 근육)'
                                : '강화할 근육'}
                          </Label>
                          <div className="mt-3">
                            <RadioGroup
                              defaultValue={exercise.muscleDirection || 'left'}
                              className="flex items-center gap-4 md:gap-8 flex-wrap"
                            >
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem
                                  value="left"
                                  id={`${exercise.id}-left`}
                                  className="border-2 border-[#8395AC] data-[state=checked]:bg-[#8395AC] data-[state=checked]:border-[#8395AC]"
                                />
                                <Label
                                  htmlFor={`${exercise.id}-left`}
                                  className="text-[#161621] text-ellipsis font-pretendard text-sm font-normal opacity-80 cursor-pointer"
                                >
                                  왼쪽 (Lt)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem
                                  value="right"
                                  id={`${exercise.id}-right`}
                                  className="border-2 border-[#DADFE9] data-[state=checked]:bg-[#8395AC] data-[state=checked]:border-[#8395AC]"
                                />
                                <Label
                                  htmlFor={`${exercise.id}-right`}
                                  className="text-[#161621] text-ellipsis font-pretendard text-sm font-normal opacity-80 cursor-pointer"
                                >
                                  오른쪽 (Rt)
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>

                        {/* 시간 선택 */}
                        <div className="w-full font-pretendard font-normal md:max-w-full">
                          <Label className="text-[#8395AC] text-sm leading-none md:max-w-full">
                            시간 선택
                          </Label>
                          <div className="mt-3 w-full">
                            <Select defaultValue={exercise.duration}>
                              <SelectTrigger className="w-full min-h-[48px] rounded-xl border-[#DADFE9] bg-[rgba(240,243,250,0.60)] text-[#66798D] [&>span]:truncate [&>span]:pr-2">
                                <SelectValue
                                  placeholder="시간을 선택하세요"
                                  className="truncate pr-2"
                                />
                              </SelectTrigger>
                              <SelectContent
                                className="max-w-[calc(100vw-2rem)] w-full z-50"
                                side="bottom"
                                align="start"
                                sideOffset={4}
                                position="popper"
                                avoidCollisions={true}
                                collisionPadding={8}
                              >
                                {durations.map(duration => (
                                  <SelectItem
                                    key={duration}
                                    value={duration}
                                    className="text-sm max-w-full"
                                  >
                                    <span className="block truncate pr-2 max-w-[calc(100vw-4rem)]">
                                      {duration}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* 항목 추가 버튼 */}
                  <div className="w-full md:max-w-full">
                    <Button
                      variant="default"
                      className="w-[80px] h-[40px] rounded-[12px] bg-[#BDD5FF]/50 text-[#0054A6] "
                      onClick={onExerciseAdd}
                    >
                      항목 추가
                    </Button>
                  </div>
                </div>
              </div>

              {/* 프로그램 반복 수 */}
              <div className="mt-12 w-full font-pretendard w-full md:mt-10 p-6">
                <div className="w-full h-px bg-[#F0F3FA] rounded-[20px] w-full" />
                <div className="flex mt-6 w-full items-start gap-4 md:gap-[104px] justify-start flex-wrap w-full">
                  <div className="min-w-[200px] flex-grow flex-shrink basis-0 max-w-full md:w-[266px]">
                    <div className="min-h-12 w-full">
                      <div className="w-full">
                        <div className="text-[#161621] leading-tight text-lg font-bold leading-[1.4] md:max-w-full">
                          프로그램 반복 수
                        </div>
                        <div className="text-[#66798D] leading-tight text-[13px] font-normal leading-none mt-2.5">
                          최소 3회, 최대 12회까지 설정할 수 있어요
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#66798D] font-normal justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0"
                      onClick={handleRepetitionDecrease}
                      disabled={currentRepetition <= 3}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="text-[#66798D] w-[52px] text-center">{currentRepetition}회</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0"
                      onClick={handleRepetitionIncrease}
                      disabled={currentRepetition >= 12}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* 생성 완료 버튼 */}
              <div className="mt- w-full font-pretendard md:max-w-full md:mt-10 p-6">
                <div className="w-full h-px bg-[#F0F3FA] rounded-[20px] md:max-w-full" />
                <div className="flex mt-6 w-full items-center justify-start w-full">
                  <div className="flex items-center gap-2 text-sm text-[#66798D] font-normal">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-[108px] h-[44px] text-white bg-[#0054A6] rounded-[12px] hover:bg-[#0054A6]/80 hover:text-white"
                      onClick={onComplete}
                    >
                      생성 완료
                    </Button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex items-center gap-5 justify-end md:justify-start h-[40px] md:h-[84px] w-full md:w-1/6 ">
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0 p-0 h-auto cursor-pointer hover:bg-transparent"
          onClick={onDelete}
        >
          <Trash className="w-6 h-6 text-[#8395AC] cursor-pointer" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0 p-0 h-auto cursor-pointer hover:bg-transparent"
          onClick={onEdit}
        >
          <Edit className="w-6 h-6 text-[#8395AC] cursor-pointer" />
        </Button>
      </div>
    </div>
  );
}
