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

  const style = {
    width: isHorizontal ? length : thickness,
    height: isHorizontal ? thickness : length,
  };

  return <div className={cn('bg-slate-200', className)} style={style} />;
};

export default Divider;
