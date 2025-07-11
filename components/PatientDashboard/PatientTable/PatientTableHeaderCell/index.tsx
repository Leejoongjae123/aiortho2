'use client';
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RiExpandUpDownFill } from 'react-icons/ri';
import { TableColumn } from '../types';
import { Patient } from '@/models';
import { cn } from '@/lib/utils';

export interface DraggableTableHeaderCellProps {
  column: TableColumn;
  sortBy: keyof Patient | 'createdAt';
  onColumnSortChange: (newSortBy: keyof Patient | 'createdAt') => void;
}

function DraggableHeaderCell({
  column,
  sortBy,
  onColumnSortChange,
}: DraggableTableHeaderCellProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
  });

  const [selectedSortColumn, setSelectedSortColumn] = useState<keyof Patient | 'createdAt'>(sortBy);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSortClick = (columnId: keyof Patient | 'createdAt') => {
    setSelectedSortColumn(columnId);
    onColumnSortChange(columnId);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex justify-center items-center px-3 py-3 my-auto min-h-12 ${column.flex} cursor-grab active:cursor-grabbing ${
        isDragging ? 'z-50 opacity-50' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <h2 className="text-sm font-bold opacity-80 text-zinc-900 select-none">{column.label}</h2>
      <RiExpandUpDownFill
        className={cn(
          'w-5 h-5 text-zinc-400 ml-1',
          selectedSortColumn === sortBy && 'fill-[var(--aiortho-primary)]'
        )}
        onClick={() => handleSortClick(column.id)}
      />

      {/* 드래그 중임을 나타내는 시각적 피드백 */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-100 border-2 border-blue-300 rounded opacity-30" />
      )}
    </div>
  );
}

export default DraggableHeaderCell;
