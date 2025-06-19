import { useRef, useEffect } from 'react';

// Define the type for specialty items
export type ArrayItem = {
  id: string;
  name: string;
};

// Define props for our multi-column dropdown component
type MultiColumnDropdownProps = {
  onSelect?: (item: ArrayItem) => void;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  array?: ArrayItem[][];
  width?: string;
  height?: string;
  maxHeight?: string;
  containerStyle?: React.CSSProperties;
  columns?: number;
};

export default function MultiColumnDropdown({
  onSelect,
  className = '',
  isOpen = false,
  onClose,
  array,
  width = 'w-full',
  height = 'auto',
  maxHeight = '360px',
  containerStyle = {},
  columns = 4,
}: MultiColumnDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (onClose) onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSelect = (item: ArrayItem) => {
    if (onSelect) {
      onSelect(item);
    }
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Determine column grid class
  const gridClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[columns] || 'grid-cols-4';

  return (
    <div
      ref={dropdownRef}
      className={`scrollable absolute z-50 bg-white border border-gray-200 rounded-md overflow-hidden ${width} ${className} shadow-[0_0_30px_0_#9FABC44D]`}
      style={{
        height,
        maxHeight,
        overflowY: 'auto',
        ...containerStyle,
      }}
    >
      <div className="p-2">
        {array?.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid ${gridClass} gap-1 mb-1`}>
            {row.map(item => (
              <button
                key={item.id}
                className="px-2 py-3 text-sm font-bold text-center text-[#343A47] hover:bg-[#F3F5FB] rounded-md focus:outline-none focus:bg-[#F3F5FB]"
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
