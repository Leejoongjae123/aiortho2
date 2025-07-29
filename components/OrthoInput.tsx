import { UseFormRegisterReturn } from 'react-hook-form';
import React, { FC, InputHTMLAttributes, useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface OrthoInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  placeholder?: string;
  error?: string;
  apiResponse?: boolean;
  apiResponseMessage?: string;
  registration?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  width?: string;
  maxLength?: number;
  minLength?: number;
  className?: string;
  value?: string;
  isDirty?: boolean;
}

const OrthoInput: FC<OrthoInputProps> = ({
  label,
  placeholder,
  error,
  registration,
  onChange,
  type = 'text',
  required = false,
  rightIcon,
  onRightIconClick,
  width = 'w-full',
  apiResponse,
  apiResponseMessage,
  maxLength,
  minLength,
  className,
  value,
  readOnly,
  isDirty,
  ...props
}) => {
  const [hasValue, setHasValue] = useState(false);

  // 초기값 및 value prop 변화 감지
  useEffect(() => {
    if (value !== undefined) {
      setHasValue(value.length > 0);
    }
  }, [value]);

  return (
    <div className={`space-y-2 ${width} `}>
      {label && (
        <Label className="text-sm font-medium text-[color:var(--aiortho-gray-500)] relative">
          <span className="-mr-2 -mb-1">{label}</span>
          {required && (
            <span
              className={`inline-block ${
                apiResponse || error
                  ? 'text-[color:var(--aiortho-danger)]'
                  : 'text-[color:var(--aiortho-primary)]'
              }`}
            >
              *
            </span>
          )}
        </Label>
      )}
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full placeholder:text-[color:var(--aiortho-gray-400)] h-12',
            error &&
              'border-2 border-[color:var(--aiortho-danger)] focus:border-[color:var(--aiortho-danger)] focus:ring-0 focus:ring-offset-0',
            isDirty &&
              hasValue &&
              !error &&
              'border-[color:var(--aiortho-primary)] ring-1 ring-[color:var(--aiortho-primary)]',
            readOnly &&
              'bg-[#F0F3FA99] border-[#DADFE9] cursor-not-allowed text-[color:var(--aiortho-gray-600)]',
            className
          )}
          {...registration}
          onChange={e => {
            setHasValue(e.target.value.length > 0);
            registration?.onChange && registration.onChange(e);
            onChange && onChange(e);
          }}
          onFocus={e => {
            if (readOnly) {
              e.target.blur();
            }
          }}
          maxLength={maxLength}
          minLength={minLength}
          value={value}
          {...props}
        />
        {rightIcon && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="font-normal text-[color:var(--aiortho-danger)] text-xs mt-1">{error}</p>
      )}
      {apiResponseMessage && (
        <p
          className={`font-normal ${
            apiResponse ? 'text-[color:var(--aiortho-danger)]' : 'text-[#1FB059]'
          }  text-xs mt-1`}
        >
          {apiResponseMessage}
        </p>
      )}
    </div>
  );
};

export default OrthoInput;
