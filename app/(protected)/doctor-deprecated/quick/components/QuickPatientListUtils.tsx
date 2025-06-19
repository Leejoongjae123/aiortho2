import { PatientTableColumn } from '../types';

// localStorage 키 상수 (quick 페이지용)
const QUICK_PATIENT_LIST_COLUMN_ORDER_KEY = 'doctorQuickPatientListColumnOrder';

// 기본 컬럼 설정
export const defaultQuickPatientListColumns: PatientTableColumn[] = [
  { id: 'registrationNumber', label: '등록번호', flex: 'flex-[0.8]', isVisible: true },
  { id: 'patientName', label: '환자명', flex: 'flex-[0.7]', isVisible: true },
  { id: 'birthDate', label: '생년월일', flex: 'flex-[0.8]', isVisible: true },
  { id: 'gender', label: '성별', flex: 'flex-[0.5]', isVisible: true },
  { id: 'sa', label: 'S/A', flex: 'flex-[0.6]', isVisible: true },
  { id: 'doctor', label: '담당 의사', flex: 'flex-[0.7]', isVisible: true },
  { id: 'treatmentPeriod', label: '치료 처방 기간', flex: 'flex-[1.2]', isVisible: true },
  { id: 'registrationDate', label: '환자 등록일', flex: 'flex-[1.0]', isVisible: true },
  { id: 'lastPrescriptionDate', label: '최종 처방일', flex: 'flex-[1.0]', isVisible: true },
  { id: 'status', label: '처방 상태', flex: 'flex-[0.8]', isVisible: true },
];

// localStorage에서 컬럼 순서 불러오기
export const loadQuickPatientListColumnOrder = (): PatientTableColumn[] => {
  if (typeof window === 'undefined') return defaultQuickPatientListColumns;

  try {
    const saved = localStorage.getItem(QUICK_PATIENT_LIST_COLUMN_ORDER_KEY);
    if (!saved) return defaultQuickPatientListColumns;

    const savedOrder: string[] = JSON.parse(saved);

    // 저장된 순서에 따라 컬럼 재정렬
    const reorderedColumns = savedOrder
      .map(id => defaultQuickPatientListColumns.find(col => col.id === id))
      .filter(Boolean) as PatientTableColumn[];

    // 새로 추가된 컬럼이 있다면 끝에 추가
    const missingColumns = defaultQuickPatientListColumns.filter(
      col => !savedOrder.includes(col.id)
    );

    return [...reorderedColumns, ...missingColumns];
  } catch (error) {
    return defaultQuickPatientListColumns;
  }
};

// localStorage에 컬럼 순서 저장하기
export const saveQuickPatientListColumnOrder = (columns: PatientTableColumn[]): void => {
  if (typeof window === 'undefined') return;

  try {
    const columnIds = columns.map(col => col.id);
    localStorage.setItem(QUICK_PATIENT_LIST_COLUMN_ORDER_KEY, JSON.stringify(columnIds));
  } catch (error) {
    // localStorage 저장 실패 시 무시
  }
};
