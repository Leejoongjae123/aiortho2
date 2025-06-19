'use client';
import React from 'react';
import { toast } from 'sonner';
import ToastNotification from './toast-notification';

interface ToastWarningProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const warningIcon = <img src="/warning.png" alt="warning" className="w-8 h-8" />;

export const ToastWarning: React.FC<ToastWarningProps> = ({
  title,
  description,
  icon = warningIcon,
}) => {
  return (
    <div className="flex  p-[14px_16px] items-center gap-4 rounded-xl border border-[#F3F2F8] shadow-[0px_4px_32px_0px_rgba(159,171,196,0.30)] h-[66px] box-border bg-white min-w-[320px] sm:w-[50vw] sm:p-[12px_14px] sm:gap-3">
      {icon}
      <div className="flex flex-col items-start flex-1">
        <div className="text-[#343F4E] font-medium text-[14.5px] leading-[140%] sm:text-[13.5px]">
          {title}
        </div>
        <div className="self-stretch text-[#66798D] font-medium text-[13px] leading-[140%] sm:text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

export const showWarningToast = (title: string, description: string) => {
  toast.custom(() => <ToastWarning title={title} description={description} />, {
    position: 'top-center',
    style: {
      position: 'fixed',
      top: '10%',
      left: '50%',
      transform: 'translate(-50%, 10%)',
      zIndex: 9999,
    },
  });
};

export default ToastWarning;
