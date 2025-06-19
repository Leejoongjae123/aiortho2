'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RiExpandUpDownFill } from 'react-icons/ri';
import { HiOutlineSelector } from 'react-icons/hi';

interface DraggableQuickPatientTableHeaderProps {
  id: string;
  label: string;
  flex: string;
}

export default function DraggableQuickPatientTableHeader({
  id,
  label,
  flex,
}: DraggableQuickPatientTableHeaderProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${flex} ${isDragging ? 'opacity-50 z-50' : ''} transition-opacity duration-200`}
    >
      <div
        className={`flex justify-center items-center px-3 py-3 my-auto min-h-12 cursor-pointer hover:bg-slate-200 rounded-lg transition-colors group relative ${
          isDragging ? 'bg-slate-200' : ''
        }`}
        {...listeners}
        {...attributes}
      >
        <div className="flex items-center justify-center gap-1">
          <h2 className="text-sm font-bold opacity-80 text-zinc-900">{label}</h2>
          <RiExpandUpDownFill className="w-3 h-3 text-zinc-400" />
        </div>

        {/* 드래그 핸들 표시 */}
        <div className="absolute left-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <HiOutlineSelector className="w-4 h-4 text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
