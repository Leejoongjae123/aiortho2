import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Program } from '@/models';
import { createDefaultExercise } from '@/components/PrescriptionProgramCard/utils';

interface ProgramCreateModalProps {
  standardProgram: Program[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (program: Program) => void;
}

export default function ProgramCreateModal({
  isOpen,
  standardProgram,
  onClose,
  onSelect,
}: ProgramCreateModalProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleClose = () => {
    setSelectedProgram(null);
    onClose();
  };

  const handleSelect = () => {
    if (selectedProgram) {
      onSelect(selectedProgram);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-[604px] w-[95vw] sm:w-full rounded-[24px] border-none max-h-[90vh] 
                  data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300
                  data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200
                  data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
      >
        <DialogHeader className="relative flex flex-row justify-between">
          <div className="flex flex-col gap-5 text-start">
            <DialogTitle>생성할 프로그램을 선택해주세요</DialogTitle>
            <DialogDescription>선택된 프로그램은 수정할 수 있어요.</DialogDescription>
          </div>

          <X
            className="absolute -top-3 -right-3 w-6 h-6 text-[var(--aiortho-gray-600)] cursor-pointer"
            onClick={handleClose}
          />
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-10 ">
          <RadioGroup className="grid grid-cols-2 gap-4">
            {standardProgram.map(item => (
              <div
                key={item.name}
                className={cn(
                  'flex items-center w-full py-4 px-4 gap-3 border border-[var(--aiortho-gray-200)] rounded-lg hover:bg-[var(--aiortho-gray-50)] transition-colors',
                  'has-[button[data-state="checked"]]:border-[var(--aiortho-primary)]'
                )}
              >
                <RadioGroupItem
                  value={item.name}
                  id={`program-${item.name}`}
                  onClick={() => setSelectedProgram(item)}
                />
                <Label htmlFor={`program-${item.name}`} className="text-sm cursor-pointer">
                  {item.name}
                </Label>
              </div>
            ))}

            <div
              className={cn(
                'flex items-center w-full py-4 px-4 gap-3 border border-[var(--aiortho-gray-200)] rounded-lg hover:bg-[var(--aiortho-gray-50)] transition-colors',
                'has-[button[data-state="checked"]]:border-[var(--aiortho-primary)]'
              )}
            >
              <RadioGroupItem
                value={'개별 프로그램'}
                id={`개별 프로그램`}
                onClick={() =>
                  setSelectedProgram({
                    name: '개별 프로그램',
                    exercises: [createDefaultExercise()],
                    repeatCount: 3,
                  })
                }
              />
              <Label htmlFor={`개별 프로그램`} className="text-sm cursor-pointer">
                개별 프로그램
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter className="mt-7">
          <Button
            className="h-12 cursor-pointer w-full"
            disabled={selectedProgram === null}
            onClick={handleSelect}
          >
            선택
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
