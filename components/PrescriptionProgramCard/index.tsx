import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ExerciseDirection, ExerciseDirectionLabel, Prescription } from '@/models';
import Divider from '@/components/Divider';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { calculateWeeks } from '@/lib/utils';
import { ChevronUp, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface PrescriptionProgramCardProps {
  prescription: Prescription;
  disabled?: boolean;
}

export default function PrescriptionProgramCard({
  prescription,
  disabled = false,
}: PrescriptionProgramCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string>(
    prescription.exercises[0].exerciseId
  );
  const [selectedDirection, setSelectedDirection] = useState<ExerciseDirection>(
    prescription.exercises[0].direction
  );
  const [repetitions, setRepetitions] = useState<number>(3);

  const handleDirectionChange = (value: string) => {
    setSelectedDirection(value as ExerciseDirection);
  };

  const handleRepetitionsChange = (change: number) => {
    const newValue = repetitions + change;
    if (newValue >= 3 && newValue <= 12) {
      setRepetitions(newValue);
    }
  };

  return (
    <Card
      className={`border border-[var(--aiortho-gray-100)] p-5 transition-all duration-300 ease-in-out ${isOpen ? 'shadow-md' : 'shadow-sm'}`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex justify-between items-center cursor-pointer">
            <div className="flex gap-2">
              <span className="text-[var(--aiortho-gray-900)] text-lg font-semibold font-pretendard">
                {prescription.name}
              </span>

              <span className="text-xs text-[#A77600] font-bold p-2 bg-[#FEC53d]/20 rounded-sm">
                {calculateWeeks(prescription.startDate, prescription.endDate)}주 처방
              </span>
            </div>

            <ChevronUp
              className={`text-[var(--aiortho-gray-700)] h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Divider className="my-5" />

          <CardContent className="p-0 flex flex-col gap-7">
            {prescription.exercises.map((exercise, idx) => (
              <div key={exercise.exerciseId} className="flex flex-col gap-7">
                <span className="text-[var(--aiortho-gray-900)] font-semibold">
                  재활 운동 {idx + 1}
                </span>
                <div className="flex flex-col gap-3">
                  <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                    운동 종류 선택
                  </Label>
                  <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                    <SelectTrigger
                      className={cn(
                        'w-full border-[var(--aiortho-gray-200)] text-[var(--aiortho-gray-900)] focus-visible:ring-1 focus-visible:ring-[var(--aiortho-primary)] focus-visible:border-[var(--aiortho-primary)] px-4 py-3 data-[disabled]:opacity-100 disabled:bg-[#F0F3FA99]',
                        disabled && 'text-[var(--aiortho-gray-600)]'
                      )}
                      disabled={disabled}
                    >
                      {/* TODO: 프로그램 등록, 수정, 조회 용도에 맞게 리팩토링 */}
                      <SelectValue placeholder="운동 종류를 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* TODO: 프로그램 등록, 수정, 조회 용도에 맞게 리팩토링 */}
                        <SelectItem
                          value={exercise.exerciseId}
                          className={cn(disabled && 'text-[var(--aiortho-gray-600)]')}
                        >
                          <span className="truncate">{exercise.name}</span>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-3">
                  <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                    근육 방향 선택
                  </Label>
                  <RadioGroup value={selectedDirection} onValueChange={handleDirectionChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="left"
                        id="left"
                        className="text-[var(--aiortho-gray-500)] border-2 border-[var(--aiortho-gray-200)] data-[state=checked]:border-[var(--aiortho-gray-500)] data-[state=checked]:bg-transparent cursor-pointer"
                        disabled={disabled}
                      />
                      <Label
                        htmlFor="left"
                        className={cn(
                          'text-[var(--aiortho-gray-900)] text-sm cursor-pointer',
                          disabled && 'text-[var(--aiortho-gray-500)] cursor-default'
                        )}
                      >
                        {ExerciseDirectionLabel[ExerciseDirection.Left]}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="right"
                        id="right"
                        className="text-[var(--aiortho-gray-500)] border-2 border-[var(--aiortho-gray-200)] data-[state=checked]:border-[var(--aiortho-gray-500)] data-[state=checked]:bg-transparent cursor-pointer"
                        disabled={disabled}
                      />
                      <Label
                        htmlFor="right"
                        className={cn(
                          'text-[var(--aiortho-gray-900)] text-sm cursor-pointer',
                          disabled && 'text-[var(--aiortho-gray-500)] cursor-default'
                        )}
                      >
                        {ExerciseDirectionLabel[ExerciseDirection.Right]}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-3">
                  <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                    시간 선택
                  </Label>
                  <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                    <SelectTrigger
                      className={cn(
                        'w-full border-[var(--aiortho-gray-200)] text-[var(--aiortho-gray-900)] focus-visible:ring-1 focus-visible:ring-[var(--aiortho-primary)] focus-visible:border-[var(--aiortho-primary)] px-4 py-3 data-[disabled]:opacity-100 disabled:bg-[#F0F3FA99]',
                        disabled && 'text-[var(--aiortho-gray-600)]'
                      )}
                      disabled={disabled}
                    >
                      {/* TODO: 프로그램 등록, 수정, 조회 용도에 맞게 리팩토링 */}
                      <SelectValue placeholder="운동 시간을 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* TODO: 프로그램 등록, 수정, 조회 용도에 맞게 리팩토링 */}
                        <SelectItem
                          value={exercise.exerciseId}
                          className={cn(disabled && 'text-[var(--aiortho-gray-600)]')}
                        >
                          {exercise.duration}분
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Divider />

                <div className="flex justify-between">
                  <div className="flex flex-col gap-3">
                    <p className="text-[var(--aiortho-gray-900)] text-lg font-bold">
                      프로그램 반복 수
                    </p>
                    <p className="text-[var(--aiortho-gray-600)] text-sm">
                      최소 3회, 최대 12회까지 설정할 수 있어요
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer bg-[#F7F9FC] h-6 w-6 text-[var(--aiortho-gray-600)] hover:text-[var(--aiortho-gray-900)] disabled:text-[#DADFE9]"
                      onClick={() => handleRepetitionsChange(-1)}
                      disabled={repetitions <= 3 || disabled}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-[var(--aiortho-gray-600)] text-sm mx-2">
                      {repetitions}회
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-[#F7F9FC] cursor-pointer h-6 w-6 text-[var(--aiortho-gray-600)] hover:text-[var(--aiortho-gray-900)] disabled:text-[#DADFE9]"
                      onClick={() => handleRepetitionsChange(1)}
                      disabled={repetitions >= 12 || disabled}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
