'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * StatusToggle Component
 *
 * 여러 상태 옵션 중에서 하나를 선택할 수 있는 토글 버튼 컴포넌트입니다.
 *
 * @example
 * // 기본 사용법
 * <StatusToggle
 *   options={["처방전", "처방대기", "완료"]}
 *   activeOption={activeStatus}
 *   onOptionChange={setActiveStatus}
 * />
 *
 * @example
 * // 고급 사용법 (객체 옵션)
 * <StatusToggle
 *   options={[
 *     { value: "prescription", label: "처방전" },
 *     { value: "waiting", label: "처방대기", disabled: true },
 *     { value: "completed", label: "완료" }
 *   ]}
 *   activeOption={activeStatus}
 *   onOptionChange={setActiveStatus}
 *   size="lg"
 *   variant="outline"
 * />
 */

interface StatusToggleOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface StatusToggleProps {
  /** 토글할 옵션들. 문자열 배열 또는 객체 배열 */
  options: (string | StatusToggleOption)[];
  /** 현재 활성화된 옵션 */
  activeOption: string;
  /** 옵션이 변경될 때 호출되는 콜백 함수 */
  onOptionChange: (option: string) => void;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 컴포넌트 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 컴포넌트 변형 스타일 */
  variant?: 'default' | 'outline';
  /** 전체 컴포넌트 비활성화 여부 */
  disabled?: boolean;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({
  options,
  activeOption,
  onOptionChange,
  className,
  size = 'md',
  variant = 'default',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'px-0.5 py-0.5 text-xs',
    md: 'px-1 py-1 text-sm',
    lg: 'px-2 py-2 text-base',
  };

  const buttonSizeClasses = {
    sm: 'px-1.5 py-1',
    md: 'px-2 py-2',
    lg: 'px-3 py-2.5',
  };

  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-200',
    outline: 'bg-transparent border-2 border-gray-300',
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center font-pretandard font-medium whitespace-nowrap text-center leading-none justify-end',
        'md:w-auto w-full',
        sizeClasses[size],
        variantClasses[variant],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      role="tablist"
      aria-label="상태 선택"
    >
      {options.map((option, index) => {
        const isObject = typeof option === 'object';
        const value = isObject ? option.value : option;
        const label = isObject ? option.label : option;
        const isDisabled = disabled || (isObject && option.disabled);
        const isActive = activeOption === value;

        return (
          <button
            key={value}
            onClick={() => !isDisabled && onOptionChange(value)}
            disabled={isDisabled}
            className={cn(
              'self-stretch rounded-full my-auto transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
              'md:flex-none flex-1',
              buttonSizeClasses[size],
              isActive
                ? 'bg-[#0D8EFF] text-white font-bold shadow-sm'
                : 'text-[#8395AC] hover:text-[#66798D] hover:bg-gray-50',
              isDisabled &&
                'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-[#8395AC]'
            )}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${value}`}
            tabIndex={isActive ? 0 : -1}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default StatusToggle;
