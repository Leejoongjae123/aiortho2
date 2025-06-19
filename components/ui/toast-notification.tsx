'use client';
import React from 'react';
import { toast } from 'sonner';

interface ToastNotificationProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const successIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="check-icon"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.4536 3.39859C17.1186 3.98444 17.186 5.00213 16.6041 5.67167L10.4817 12.7163C9.16606 14.2301 6.89995 14.4328 5.33988 13.1763L1.60054 10.1645C0.910528 9.60868 0.798655 8.59497 1.35067 7.90026C1.90268 7.20555 2.90954 7.09292 3.59956 7.64869L7.33889 10.6605C7.56176 10.84 7.88549 10.8111 8.07343 10.5948L14.1959 3.55013C14.7778 2.88059 15.7886 2.81274 16.4536 3.39859Z"
      fill="white"
    />
  </svg>
);

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  title,
  description,
  icon = successIcon,
}) => {
  return (
    <div className="flex  p-[14px_16px] items-center gap-4 rounded-xl border border-[#F3F2F8] shadow-[0px_4px_32px_0px_rgba(159,171,196,0.30)] h-[66px] box-border bg-white min-w-[320px] sm:w-[40vw] sm:p-[12px_14px] sm:gap-3">
      <div className="flex w-8 h-8 p-[7px] justify-center items-center flex-shrink-0 rounded-xl bg-[#2DD06E] sm:w-7 sm:h-7 sm:p-[6px]">
        {icon}
      </div>
      <div className="flex flex-col items-start flex-1">
        <div className="text-[#343F4E] font-medium text-[14.5px] leading-[140%] sm:text-[14.5px]">
          {title}
        </div>
        <div className="self-stretch text-[#66798D] font-medium text-[13px] leading-[140%] sm:text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

export const showSuccessToast = (title: string, description: string) => {
  toast.custom(() => <ToastNotification title={title} description={description} />, {
    position: 'top-center',
    style: {
      position: 'fixed',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, 10%)',
      zIndex: 9999,
    },
  });
};

export default ToastNotification;
