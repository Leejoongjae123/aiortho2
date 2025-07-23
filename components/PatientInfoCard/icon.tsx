import React from 'react';

interface EditIconProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  strokeColor?: string;
  className?: string;
}

const EditIcon: React.FC<EditIconProps> = ({
  width = 28,
  height = 28,
  backgroundColor = '#E9ECF2',
  strokeColor = '#97A8C4',
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="28" height="28" rx="14" fill={backgroundColor} />
      <path
        d="M11.5643 20.75H19.25M13.8383 8.98378C13.8383 8.98378 13.8383 10.2098 15.0643 11.4357C16.2902 12.6617 17.5162 12.6617 17.5162 12.6617M8.98972 18.4911L11.5643 18.1233C11.9356 18.0702 12.2798 17.8981 12.545 17.6329L18.7422 11.4357C19.4193 10.7586 19.4193 9.66087 18.7422 8.98378L17.5162 7.75781C16.8391 7.08073 15.7414 7.08073 15.0643 7.75781L8.86712 13.955C8.60186 14.2202 8.42979 14.5644 8.37673 14.9357L8.00894 17.5103C7.92721 18.0824 8.4176 18.5728 8.98972 18.4911Z"
        stroke={strokeColor}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EditIcon;
