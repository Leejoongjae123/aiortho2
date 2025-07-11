import { TableColumn } from './PatientTable/types';

// 기본 컬럼 순서 정의
export const DEFAULT_COLUMNS: TableColumn[] = [
  { id: 'registrationNumber', flex: 'flex-[0.8]', key: '병원 환자 번호' },
  { id: 'patientName', flex: 'flex-[0.7]', key: '환자명' },
  { id: 'birthDate', flex: 'flex-[0.8]', key: '생년월일' },
  { id: 'sa', flex: 'flex-[0.6]', key: 'S/A' },
  { id: 'doctor', flex: 'flex-[0.7]', key: '담당 의사' },
  { id: 'treatmentPeriod', flex: 'flex-[1.2]', key: '치료 처방 기간' },
  { id: 'registrationDate', flex: 'flex-[1.0]', key: '환자 등록일' },
  {
    id: 'lastPrescriptionDate',
    flex: 'flex-[1.0]',
    key: '최종 처방일',
  },
  { id: 'prescriptionStatus', flex: 'flex-[0.8]', key: '처방 상태' },
];

const STORAGE_KEY = 'doctor-patient-table-column-order';

// localStorage에서 컬럼 순서 불러오기
export const loadColumnOrder = (): TableColumn[] => {
  if (typeof window === 'undefined') return DEFAULT_COLUMNS;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_COLUMNS;

    const savedOrder: string[] = JSON.parse(saved);

    // 저장된 순서에 따라 컬럼 재정렬
    const orderedColumns = savedOrder
      .map(id => DEFAULT_COLUMNS.find(col => col.id === id))
      .filter(Boolean) as TableColumn[];

    // 새로 추가된 컬럼이 있다면 뒤에 추가
    const missingColumns = DEFAULT_COLUMNS.filter(col => !savedOrder.includes(col.id));

    return [...orderedColumns, ...missingColumns];
  } catch (error) {
    console.warn('컬럼 순서 불러오기 실패:', error);
    return DEFAULT_COLUMNS;
  }
};

// localStorage에 컬럼 순서 저장
export const saveColumnOrder = (columns: TableColumn[]): void => {
  if (typeof window === 'undefined') return;

  try {
    const columnIds = columns.map(col => col.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columnIds));
  } catch (error) {
    console.warn('컬럼 순서 저장 실패:', error);
  }
};

// 배열에서 요소 위치 변경 헬퍼 함수
export const arrayMove = <T>(array: T[], from: number, to: number): T[] => {
  const newArray = [...array];
  const item = newArray.splice(from, 1)[0];
  newArray.splice(to, 0, item);
  return newArray;
};
