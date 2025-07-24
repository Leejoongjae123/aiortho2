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
import { TableColumn } from '../types';
import DoctorRegistrationTableHeaderCell from '../DoctorRegistrationTableHeaderCell';

interface DoctorRegistrationTableHeaderProps {
  columns: TableColumn[];
  sortDirection: 'asc' | 'desc' | null;
  sortBy: TableColumn['id'];
  onColumnOrderChange: (newColumns: TableColumn[]) => void;
  onColumnSortChange: (newSortBy: TableColumn['id']) => void;
}

export default function DoctorRegistrationTableHeader({
  columns,
  sortDirection,
  sortBy,
  onColumnOrderChange,
  onColumnSortChange,
}: DoctorRegistrationTableHeaderProps) {
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
            <DoctorRegistrationTableHeaderCell
              key={column.id}
              column={column}
              sortBy={column.id === sortBy}
              sortDirection={column.id === sortBy ? sortDirection : null}
              onColumnSortChange={onColumnSortChange}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
