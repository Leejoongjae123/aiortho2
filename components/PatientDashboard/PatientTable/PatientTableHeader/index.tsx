'use client';

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

interface DraggableTableHeaderProps {
  columns: TableColumn[];
  sortDirection: 'asc' | 'desc' | null;
  currentSortedColumnId: TableColumn['id'];
  onColumnOrderChange: (newColumns: TableColumn[]) => void;
  onColumnSortChange: (newSortBy: TableColumn['sortKey'], columnId: TableColumn['id']) => void;
}

function DraggableTableHeader({
  columns,
  sortDirection,
  currentSortedColumnId,
  onColumnOrderChange,
  onColumnSortChange,
}: DraggableTableHeaderProps) {
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

  const handleColumnSortChange = (
    newSortBy: TableColumn['sortKey'],
    columnId: TableColumn['id']
  ) => {
    const column = columns.find(column => column.id === columnId);
    if (column) {
      onColumnSortChange(newSortBy, columnId);
    }
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
              sortBy={column.id === currentSortedColumnId}
              sortDirection={column.id === currentSortedColumnId ? sortDirection : null}
              onColumnSortChange={handleColumnSortChange}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DraggableTableHeader;
