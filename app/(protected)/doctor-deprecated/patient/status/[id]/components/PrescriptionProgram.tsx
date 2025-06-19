'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IoClose } from 'react-icons/io5';
interface PrescriptionProgramProps {
  date?: string;
  programName?: string;
  programDuration?: string;
  isExpanded?: boolean;
}

const PrescriptionProgram: React.FC<PrescriptionProgramProps> = ({
  date = '2025.04.22 (화)',
  programName = '표준 프로그램 5',
  programDuration = '10주 처방',
  isExpanded = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isExpanded);
  const [selectedExercise, setSelectedExercise] = useState<string>('lateral-flexion');
  const [selectedDirection, setSelectedDirection] = useState<string>('left');
  const [selectedTime, setSelectedTime] = useState<string>('15');
  const [repetitions, setRepetitions] = useState<number>(3);

  const exerciseOptions = [
    {
      value: 'lateral-flexion',
      label: '옆쪽 목 늘리기 스트레칭 (Lateral Flexion Stretching)',
    },
    {
      value: 'forward-flexion',
      label: '앞쪽 목 늘리기 스트레칭 (Forward Flexion Stretching)',
    },
    {
      value: 'rotation',
      label: '목 회전 스트레칭 (Rotation Stretching)',
    },
  ];

  const timeOptions = [
    { value: '5', label: '5분' },
    { value: '10', label: '10분' },
    { value: '15', label: '15분' },
    { value: '20', label: '20분' },
    { value: '30', label: '30분' },
  ];

  const handleRepetitionsChange = (change: number) => {
    const newValue = repetitions + change;
    if (newValue >= 3 && newValue <= 12) {
      setRepetitions(newValue);
    }
  };

  return (
    <div className="w-full ">
      <div className="text-[#66798D] text-base font-normal mb-5 font-pretendard">{date}</div>

      <Card className="border border-[#F0F3FA] shadow-none w-full">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <div className="w-full px-5 cursor-pointer">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <h3 className="text-[#161621] text-lg font-semibold font-pretendard">
                    {programName}
                  </h3>
                  <div className="rounded-md bg-[rgba(254,197,61,0.2)] px-2 py-1">
                    <span className="text-xs text-[#A77600] font-bold">{programDuration}</span>
                  </div>
                </div>
                <div className="text-[#66798D]">
                  {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="px-5 pb-8">
              <div className="mt-5 pt-5 border-t border-[#F0F3FA]">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-[#161621] text-base font-semibold font-pretendard">
                    재활 운동 1
                  </h4>
                </div>

                <div className="space-y-6">
                  {/* 운동 종류 선택 */}
                  <div className="space-y-3">
                    <Label className="text-[#8395AC] text-sm font-pretendard">운동 종류 선택</Label>
                    <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                      <SelectTrigger className="w-full bg-[rgba(240,243,250,0.6)] border-[#DADFE9] text-[#66798D]">
                        <SelectValue className="truncate" />
                      </SelectTrigger>
                      <SelectContent>
                        {exerciseOptions.map(option => (
                          <SelectItem key={option.value} value={option.value} className="truncate">
                            <span className="truncate block" title={option.label}>
                              {option.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 근육 방향 */}
                  <div className="space-y-3">
                    <Label className="text-[#8395AC] text-sm font-pretendard">근육 방향</Label>
                    <RadioGroup
                      value={selectedDirection}
                      onValueChange={setSelectedDirection}
                      className="flex gap-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="left"
                          id="left"
                          className="border-[#DADFE9] data-[state=checked]:border-[#8395AC] data-[state=checked]:bg-[#8395AC]"
                        />
                        <Label
                          htmlFor="left"
                          className="text-[#161621] text-sm font-pretendard opacity-80"
                        >
                          왼쪽 (Lt)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="right"
                          id="right"
                          className="border-[#DADFE9] data-[state=checked]:border-[#8395AC] data-[state=checked]:bg-[#8395AC]"
                        />
                        <Label
                          htmlFor="right"
                          className="text-[#161621] text-sm font-pretendard opacity-80"
                        >
                          오른쪽 (Rt)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 시간 선택 */}
                  <div className="space-y-3">
                    <Label className="text-[#8395AC] text-sm font-pretendard">시간 선택</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="w-full bg-[rgba(240,243,250,0.6)] border-[#DADFE9] text-[#66798D]">
                        <SelectValue className="truncate" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value} className="truncate">
                            <span className="truncate block" title={option.label}>
                              {option.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 프로그램 반복 수 */}
                <div className="mt-12 pt-6 border-t border-[#F0F3FA]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="text-[#161621] text-lg font-bold font-pretendard">
                        프로그램 반복 수
                      </h4>
                      <p className="text-[#66798D] text-[13px] font-pretendard mt-2.5">
                        최소 3회, 최대 12회까지 설정할 수 있어요
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-[#66798D] hover:text-[#161621] disabled:text-[#DADFE9]"
                        onClick={() => handleRepetitionsChange(-1)}
                        disabled={repetitions <= 3}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-[#66798D] text-sm font-pretendard min-w-[52px] text-center">
                        {repetitions}회
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-[#66798D] hover:text-[#161621] disabled:text-[#DADFE9]"
                        onClick={() => handleRepetitionsChange(1)}
                        disabled={repetitions >= 12}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default PrescriptionProgram;
