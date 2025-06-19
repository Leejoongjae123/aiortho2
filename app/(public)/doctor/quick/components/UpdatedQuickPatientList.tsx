'use client';
import React, { useState, useEffect } from 'react';
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

import DraggableQuickPatientTableHeader from './DraggableQuickPatientTableHeader';
import DynamicQuickPatientListRow from './DynamicQuickPatientListRow';
import { PatientData, PatientTableColumn } from '../types';
import {
  loadQuickPatientListColumnOrder,
  saveQuickPatientListColumnOrder,
} from './QuickPatientListUtils';

// 더미 데이터
const dummyPatients: PatientData[] = [
  {
    id: '1',
    registrationNumber: '82869',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '홍지원',
    treatmentPeriod: '2025.01.30 ~ 2025.01.30',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '2025.01.30 (화)',
    status: '완료',
    statusType: 'completed',
  },
  {
    id: '2',
    registrationNumber: '82870',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '처방전',
    statusType: 'prescription',
  },
  {
    id: '3',
    registrationNumber: '82866',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '4',
    registrationNumber: '82867',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '처방대기',
    statusType: 'waiting',
  },
  {
    id: '5',
    registrationNumber: '82868',
    patientName: '박명수',
    birthDate: '980530',
    gender: '남',
    sa: 'M/9m7d',
    doctor: '-',
    treatmentPeriod: '-',
    registrationDate: '2025.01.30 (화)',
    lastPrescriptionDate: '-',
    status: '처방대기',
    statusType: 'waiting',
  },
];

export default function UpdatedQuickPatientList() {
  const [columns, setColumns] = useState<PatientTableColumn[]>([]);

  // 컴포넌트 마운트 시 저장된 컬럼 순서 로드
  useEffect(() => {
    setColumns(loadQuickPatientListColumnOrder());
  }, []);

  // 드래그 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 드래그 종료 핸들러
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setColumns(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        // localStorage에 새로운 순서 저장
        saveQuickPatientListColumnOrder(newOrder);

        return newOrder;
      });
    }
  };

  if (columns.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-7 w-full">
      <div className="min-w-[1080px] md:min-w-0">
        {/* 드래그 가능한 헤더 */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="flex items-center w-full rounded-xl bg-slate-100 bg-opacity-50 min-h-12 sticky top-0 z-10">
            <SortableContext
              items={columns.map(col => col.id)}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map(column => (
                <DraggableQuickPatientTableHeader
                  key={column.id}
                  id={column.id}
                  label={column.label}
                  flex={column.flex}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>

        {/* 테이블 바디 */}
        <div className="w-full">
          {dummyPatients.map((patient, index) => (
            <React.Fragment key={patient.id}>
              <DynamicQuickPatientListRow patient={patient} columns={columns} />
              {index < dummyPatients.length - 1 && <div className="w-full h-px bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
