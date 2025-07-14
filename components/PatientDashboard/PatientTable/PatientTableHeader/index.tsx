'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import PatientTableHeaderCell from '../PatientTableHeaderCell';
import { TableColumn } from '../types';
import { Patient } from '@/models';

interface DraggableTableHeaderProps {
  columns: TableColumn[];
  sortBy: keyof Patient | 'createdAt';
  onColumnOrderChange: (newColumns: TableColumn[]) => void;
  onColumnSortChange: (newSortBy: keyof Patient | 'createdAt') => void;
}

function DraggableTableHeader({
  columns,
  sortBy,
  onColumnOrderChange,
  onColumnSortChange,
}: DraggableTableHeaderProps) {
  const [selectedSortColumn, setSelectedSortColumn] = useState<keyof Patient | 'createdAt'>(sortBy);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex(column => column.id === active.id);
      const newIndex = columns.findIndex(column => column.id === over?.id);

      const newColumns = arrayMove(columns, oldIndex, newIndex);
      onColumnOrderChange(newColumns);
    }
  };

  const handleColumnSortChange = (newSortBy: keyof Patient | 'createdAt') => {
    setSelectedSortColumn(newSortBy);
    onColumnSortChange(newSortBy);
  };

  return (
    <div className="flex items-center w-full rounded-xl bg-slate-100 bg-opacity-50 min-h-12">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={columns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map(column => (
            <PatientTableHeaderCell
              key={column.id}
              column={column}
              sortBy={selectedSortColumn === column.id}
              onColumnSortChange={handleColumnSortChange}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DraggableTableHeader;
