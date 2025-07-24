import { GenericTableColumn } from '@/lib/utils';
import { Admin } from '@/models';

type TableColumnLabel = 'No' | '코드 번호' | '의사명' | '아이디(이메일)' | '가입일';

export interface TableColumn extends GenericTableColumn {
  id: keyof Admin | 'createdAt';
  label: TableColumnLabel;
}
