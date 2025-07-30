import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { X } from 'lucide-react';

interface PatientControllerProps {
  name: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export default function PatientController({ name, onClick, onDelete }: PatientControllerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete?.();
    handleClose();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button
        type="button"
        className="w-full h-12 rounded-full font-bold cursor-pointer"
        onClick={onClick}
      >
        처방하기
      </Button>

      <button
        type="button"
        className="underline underline-offset-4 text-[var(--aiortho-gray-800)] text-sm cursor-pointer"
        onClick={handleOpen}
      >
        환자 삭제
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex flex-col justify-between h-60">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              {name}님을 정말 삭제하시겠어요?
            </DialogTitle>
            <DialogDescription className="text-[var(--aiortho-gray-600)]">
              삭제된 환자는 복구할 수 없어요.
            </DialogDescription>
            <button
              onClick={handleClose}
              className="absolute z-0 rounded-[29px] flex min-h-6 min-w-6 p-1 items-center justify-center right-3 top-3 cursor-pointer"
            >
              <X className="w-5 h-5 text-[#66798D]" />
            </button>
          </DialogHeader>
          <DialogFooter className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer flex-1 h-12 font-bold m-0 rounded-full"
              onClick={handleDelete}
            >
              네, 삭제할게요
            </Button>
            <DialogClose asChild>
              <Button type="button" className="cursor-pointer flex-1 h-12 font-bold rounded-full">
                취소
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
