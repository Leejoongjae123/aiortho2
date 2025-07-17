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
 *
 * @example
 * // 뷰어 전용 모드
 * <StatusToggle
 *   options={["처방전", "처방대기", "완료"]}
 *   activeOption="처방전"
 *   readOnly={true}
 *   showActiveIndicator={true}
 * />
 *
 * @example
 * // 개별 버튼 스타일 커스터마이징
 * <StatusToggle
 *   options={[
 *     {
 *       value: "prescription",
 *       label: "처방전",
 *       buttonClassName: "bg-red-500 hover:bg-red-600",
 *       activeClassName: "bg-red-700 text-white"
 *     },
 *     {
 *       value: "waiting",
 *       label: "처방대기",
 *       buttonClassName: "bg-yellow-500 hover:bg-yellow-600",
 *       activeClassName: "bg-yellow-700 text-white"
 *     }
 *   ]}
 *   activeOption={activeStatus}
 *   onOptionChange={setActiveStatus}
 * />
 */

interface StatusToggleOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** 개별 버튼 스타일 커스터마이징 */
  buttonClassName?: string;
  /** 활성 상태일 때 개별 버튼 스타일 */
  activeClassName?: string;
  /** 비활성 상태일 때 개별 버튼 스타일 */
  inactiveClassName?: string;
  /** 비활성화된 상태일 때 개별 버튼 스타일 */
  disabledClassName?: string;
  /** 아이콘 (React 컴포넌트 또는 문자열) */
  icon?: React.ReactNode;
  /** 툴팁 텍스트 */
  tooltip?: string;
}

interface StatusToggleProps {
  /** 토글할 옵션들. 문자열 배열 또는 객체 배열 */
  options: (string | StatusToggleOption)[];
  /** 현재 활성화된 옵션 */
  activeOption?: string;
  /** 옵션이 변경될 때 호출되는 콜백 함수 */
  onOptionChange?: (option: string) => void;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 컴포넌트 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 컴포넌트 변형 스타일 */
  variant?: 'default' | 'outline' | 'solid' | 'minimal';
  /** 전체 컴포넌트 비활성화 여부 */
  disabled?: boolean;
  /** 뷰어 전용 모드 (토글 비활성화) */
  readOnly?: boolean;
  /** 활성 상태 표시기 표시 여부 */
  showActiveIndicator?: boolean;
  /** 활성 상태 표시기 색상 */
  activeIndicatorColor?: string;
  /** 전체 컨테이너 스타일 커스터마이징 */
  containerClassName?: string;
  /** 개별 버튼 기본 스타일 커스터마이징 */
  buttonBaseClassName?: string;
  /** 활성 버튼 기본 스타일 커스터마이징 */
  activeButtonClassName?: string;
  /** 비활성 버튼 기본 스타일 커스터마이징 */
  inactiveButtonClassName?: string;
  /** 비활성화된 버튼 기본 스타일 커스터마이징 */
  disabledButtonClassName?: string;
  /** 방향 */
  direction?: 'horizontal' | 'vertical';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 간격 */
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

export const StatusToggle: React.FC<StatusToggleProps> = ({
  options,
  activeOption,
  onOptionChange,
  className,
  size = 'md',
  variant = 'default',
  disabled = false,
  readOnly = false,
  showActiveIndicator = false,
  activeIndicatorColor = '#0D8EFF',
  containerClassName,
  buttonBaseClassName,
  activeButtonClassName,
  inactiveButtonClassName,
  disabledButtonClassName,
  direction = 'horizontal',
  fullWidth = false,
  gap = 'sm',
}) => {
  const sizeClasses = {
    sm: 'px-0.5 py-0.5 text-xs',
    md: 'px-1 py-1 text-sm',
    lg: 'px-2 py-2 text-base',
    xl: 'px-3 py-3 text-lg',
  };

  const buttonSizeClasses = {
    sm: 'px-1.5 py-1',
    md: 'px-2 py-2',
    lg: 'px-3 py-2.5',
    xl: 'px-4 py-3',
  };

  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-200',
    outline: 'bg-transparent border-2 border-gray-300',
    solid: 'bg-gray-100 border border-gray-200',
    minimal: 'bg-transparent',
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const directionClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const isInteractive = !disabled && !readOnly;

  return (
    <div
      className={cn(
        'rounded-full flex items-center font-pretandard font-medium whitespace-nowrap text-center leading-none',
        directionClasses[direction],
        fullWidth ? 'w-full' : 'md:w-auto w-full',
        sizeClasses[size],
        variantClasses[variant],
        gapClasses[gap],
        containerClassName,
        className
      )}
      role="tablist"
      aria-label="상태 선택"
    >
      {options.map((option, index) => {
        const isObject = typeof option === 'object';
        const value = isObject ? option.value : option;
        const label = isObject ? option.label : option;
        const isDisabled = disabled || readOnly || (isObject && option.disabled);
        const isActive = activeOption === value;
        const icon = isObject ? option.icon : null;
        const tooltip = isObject ? option.tooltip : undefined;

        // 개별 스타일 우선순위: 개별 설정 > 기본 설정 > 기본값
        const buttonStyles = cn(
          'self-stretch rounded-full my-auto transition-all duration-200 focus:outline-none',
          fullWidth ? 'flex-1' : 'md:flex-none flex-1',
          buttonSizeClasses[size],
          buttonBaseClassName,
          isActive
            ? cn(
                'bg-[#0D8EFF] text-white font-bold shadow-sm',
                activeButtonClassName,
                isObject && option.activeClassName
              )
            : cn(
                'text-[#8395AC]',
                inactiveButtonClassName,
                !readOnly && 'hover:text-[#66798D] hover:bg-gray-50',
                isObject && option.inactiveClassName
              ),
          isDisabled &&
            cn(
              // 'opacity-50 cursor-not-allowed',
              disabledButtonClassName,
              isObject && option.disabledClassName
            ),
          isObject && option.buttonClassName,
          readOnly && 'cursor-default'
        );

        return (
          <div key={value} className="relative">
            <button
              onClick={() => isInteractive && onOptionChange?.(value)}
              disabled={isDisabled}
              className={buttonStyles}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${value}`}
              tabIndex={isActive ? 0 : -1}
              title={tooltip}
            >
              <div className="flex items-center justify-center gap-1">
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <span>{label}</span>
              </div>
            </button>

            {/* 활성 상태 표시기 */}
            {showActiveIndicator && isActive && (
              <div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                style={{ backgroundColor: activeIndicatorColor }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatusToggle;
