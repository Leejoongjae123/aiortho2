import { TableColumn } from './types';
import {
  loadColumnOrder as loadGenericColumnOrder,
  saveColumnOrder as saveGenericColumnOrder,
} from '@/lib/utils';

// 기본 컬럼 순서 정의
export const DEFAULT_COLUMNS: TableColumn[] = [
  {
    id: 'no',
    label: 'No',
    flex: 'flex-[0.4]',
  },
  { id: 'signupCode', label: '코드 번호', flex: 'flex-[0.4]' },
  { id: 'name', label: '의사명', flex: 'flex-[0.6]' },
  { id: 'email', label: '아이디(이메일)', flex: 'flex-[1.0]' },
  {
    id: 'createdAt',
    label: '가입일',
    flex: 'flex-[1.0]',
  },
];

const STORAGE_KEY = 'doctor-registration-table-column-order';

// localStorage에서 컬럼 순서 불러오기
export const loadColumnOrder = (): TableColumn[] => {
  return loadGenericColumnOrder(DEFAULT_COLUMNS, STORAGE_KEY);
};

// localStorage에 컬럼 순서 저장
export const saveColumnOrder = (columns: TableColumn[]): void => {
  saveGenericColumnOrder(columns, STORAGE_KEY);
};
