import { PatientTableColumn } from "../types";

// localStorage 키 상수
const PATIENT_LIST_COLUMN_ORDER_KEY = "doctorPatientListColumnOrder";

// 기본 컬럼 설정
export const defaultPatientListColumns: PatientTableColumn[] = [
  { id: "registrationNumber", label: "등록번호", flex: "flex-[0.8]" },
  { id: "patientName", label: "환자명", flex: "flex-[0.7]" },
  { id: "birthDate", label: "생년월일", flex: "flex-[0.8]" },
  { id: "gender", label: "성별", flex: "flex-[0.5]" },
  { id: "sa", label: "S/A", flex: "flex-[0.6]" },
  { id: "doctor", label: "담당 의사", flex: "flex-[0.7]" },
  { id: "treatmentPeriod", label: "치료 처방 기간", flex: "flex-[1.2]" },
  { id: "registrationDate", label: "환자 등록일", flex: "flex-[1.0]" },
  { id: "lastPrescriptionDate", label: "최종 처방일", flex: "flex-[1.0]" },
  { id: "status", label: "처방 상태", flex: "flex-[0.8]" },
];

// localStorage에서 컬럼 순서 불러오기
export const loadPatientListColumnOrder = (): PatientTableColumn[] => {
  if (typeof window === "undefined") return defaultPatientListColumns;
  
  try {
    const saved = localStorage.getItem(PATIENT_LIST_COLUMN_ORDER_KEY);
    if (!saved) return defaultPatientListColumns;
    
    const savedOrder: string[] = JSON.parse(saved);
    
    // 저장된 순서에 따라 컬럼 재정렬
    const reorderedColumns = savedOrder
      .map(id => defaultPatientListColumns.find(col => col.id === id))
      .filter(Boolean) as PatientTableColumn[];
    
    // 새로 추가된 컬럼이 있다면 끝에 추가
    const missingColumns = defaultPatientListColumns.filter(
      col => !savedOrder.includes(col.id)
    );
    
    return [...reorderedColumns, ...missingColumns];
  } catch (error) {
    return defaultPatientListColumns;
  }
};

// localStorage에 컬럼 순서 저장하기
export const savePatientListColumnOrder = (columns: PatientTableColumn[]): void => {
  if (typeof window === "undefined") return;
  
  try {
    const columnIds = columns.map(col => col.id);
    localStorage.setItem(PATIENT_LIST_COLUMN_ORDER_KEY, JSON.stringify(columnIds));
  } catch (error) {
    // localStorage 저장 실패 시 무시
  }
}; 