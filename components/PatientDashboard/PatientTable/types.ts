type TableColumnKey =
  | '병원 환자 번호'
  | '환자명'
  | '생년월일'
  | 'S/A'
  | '담당 의사'
  | '치료 처방 기간'
  | '환자 등록일'
  | '최종 처방일'
  | '처방 상태';

export interface TableColumn {
  id: string;
  flex: string;
  key: TableColumnKey;
}
