import { cn } from '@/lib/utils';

interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  thickness?: string;
  length?: string;
  className?: string;
}

const Divider = ({
  direction = 'horizontal',
  thickness = '1px',
  length = '100%',
  className,
}: DividerProps) => {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={cn(
        'bg-slate-200',
        isHorizontal ? `w-[${length}] h-[${thickness}]` : `h-[${length}] w-[${thickness}]`,
        className
      )}
    />
  );
};

export default Divider;
