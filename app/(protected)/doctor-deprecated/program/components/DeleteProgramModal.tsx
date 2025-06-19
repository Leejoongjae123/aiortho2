'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface DeleteProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  programTitle: string;
}

const DeleteProgramModal: React.FC<DeleteProgramModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  programTitle,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="p-0 border-none max-w-[528px] rounded-[24px] overflow-hidden">
        <div className="rounded-t-[24px] bg-white relative w-full px-8 pt-12 pb-0">
          <div className="w-full font-pretendard">
            <div className="flex w-full flex-col items-start justify-start">
              <div className="w-full max-w-[406px]">
                <div className="text-[#161621] text-2xl font-bold leading-[1.4]">
                  {programTitle}을 삭제하시겠어요?
                </div>
                <div className="text-[#66798D] text-base font-normal leading-none mt-5">
                  삭제된 프로그램 내역은 복구할 수 없어요.
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full absolute z-0 flex min-h-6 w-6 p-1 items-center justify-center right-3 top-3"
          >
            <X className="w-4 h-4 text-[#66798D]" />
          </button>
        </div>
        <div className="rounded-b-[24px] bg-white flex mt-5 w-full px-8 py-7 items-start gap-3 font-pretendard text-sm font-bold leading-6">
          <button
            onClick={onClose}
            className="flex min-h-[48px] items-center justify-center text-[#343F4E] rounded-full bg-[rgba(218,223,233,0.5)] px-6 py-3 flex-1"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex min-h-[48px] items-center justify-center text-white rounded-full bg-[#0054A6] px-6 py-3 flex-1"
          >
            네, 삭제할게요
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProgramModal;
