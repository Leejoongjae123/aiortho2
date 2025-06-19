import { TableColumn } from '../types';

// 기본 컬럼 순서 정의
export const DEFAULT_COLUMNS: TableColumn[] = [
  { id: 'registrationNumber', label: '등록번호', flex: 'flex-[0.8]', key: 'registrationNumber' },
  { id: 'patientName', label: '환자명', flex: 'flex-[0.7]', key: 'patientName' },
  { id: 'birthDate', label: '생년월일', flex: 'flex-[0.8]', key: 'birthDate' },
  { id: 'gender', label: '성별', flex: 'flex-[0.5]', key: 'gender' },
  { id: 'sa', label: 'S/A', flex: 'flex-[0.6]', key: 'sa' },
  { id: 'doctor', label: '담당 의사', flex: 'flex-[0.7]', key: 'doctor' },
  { id: 'treatmentPeriod', label: '치료 처방 기간', flex: 'flex-[1.2]', key: 'treatmentPeriod' },
  { id: 'registrationDate', label: '환자 등록일', flex: 'flex-[1.0]', key: 'registrationDate' },
  {
    id: 'lastPrescriptionDate',
    label: '최종 처방일',
    flex: 'flex-[1.0]',
    key: 'lastPrescriptionDate',
  },
  { id: 'status', label: '처방 상태', flex: 'flex-[0.8]', key: 'status' },
];

const STORAGE_KEY = 'nurse-patient-list-column-order';

// localStorage에서 컬럼 순서 불러오기
export const loadNursePatientListColumnOrder = (): TableColumn[] => {
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
export const saveNursePatientListColumnOrder = (columns: TableColumn[]): void => {
  if (typeof window === 'undefined') return;

  try {
    const columnIds = columns.map(col => col.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columnIds));
  } catch (error) {
    console.warn('컬럼 순서 저장 실패:', error);
  }
};
