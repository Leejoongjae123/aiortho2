import { TableColumn } from './PatientTable/types';
import {
  loadColumnOrder as loadGenericColumnOrder,
  saveColumnOrder as saveGenericColumnOrder,
} from '@/lib/utils';

// 기본 컬럼 순서 정의
export const DEFAULT_COLUMNS: TableColumn[] = [
  {
    id: 'residentRegistrationNumber',
    flex: 'flex-[0.8]',
    label: '병원 환자 번호',
    sortKey: 'createdAt',
  },
  { id: 'name', flex: 'flex-[0.7]', label: '환자명', sortKey: 'name' },
  { id: 'birth', flex: 'flex-[0.8]', label: '생년월일', sortKey: 'age' },
  { id: 'gender', flex: 'flex-[0.6]', label: 'S/A', sortKey: 'age' },
  { id: 'doctorName', flex: 'flex-[0.7]', label: '담당 의사', sortKey: 'doctorName' },
  {
    id: 'patientId',
    flex: 'flex-[1.2]',
    label: '치료 처방 기간',
    sortKey: '_prescriptionstartDate',
  },
  { id: 'createdAt', flex: 'flex-[1.0]', label: '환자 등록일', sortKey: 'createdAt' },
  {
    id: 'updatedAt',
    flex: 'flex-[1.0]',
    label: '최종 처방일',
    sortKey: '_prescriptionupdatedAt',
  },
  {
    id: 'prescriptionStatus',
    flex: 'flex-[0.8]',
    label: '처방 상태',
    sortKey: 'prescriptionStatus',
  },
];

const STORAGE_KEY = 'patient-table-column-order';

// localStorage에서 컬럼 순서 불러오기
export const loadColumnOrder = (): TableColumn[] => {
  return loadGenericColumnOrder(DEFAULT_COLUMNS, STORAGE_KEY);
};

// localStorage에 컬럼 순서 저장
export const saveColumnOrder = (columns: TableColumn[]): void => {
  saveGenericColumnOrder(columns, STORAGE_KEY);
};
