export interface PatientData {
  id: string;
  registrationNumber: string;
  patientName: string;
  birthDate: string;
  gender: string;
  sa: string;
  doctor: string;
  treatmentPeriod: string;
  registrationDate: string;
  lastPrescriptionDate: string;
  status: string;
  statusType: 'waiting' | 'prescription' | 'completed';
}

export interface StatusBadgeProps {
  status: string;
  type: 'waiting' | 'prescription' | 'completed';
}

export interface TableHeaderCellProps {
  id: string;
  label: string;
  flex: string;
  index?: number;
}

export interface PatientTableRowProps {
  id: string;
  registrationNumber: string;
  patientName: string;
  birthDate: string;
  gender: string;
  sa: string;
  doctor: string;
  treatmentPeriod: string;
  registrationDate: string;
  lastPrescriptionDate: string;
  status: string;
  statusType: 'waiting' | 'prescription' | 'completed';
  columnOrder: string[];
}

export interface PatientListTitleProps {
  title: string;
  count: number;
}

export interface PatientListSearchProps {
  showOnlyMyPatients: boolean;
  setShowOnlyMyPatients: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export interface PatientListSheetProps {
  showOnlyMyPatients: boolean;
  setShowOnlyMyPatients: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

// 드래그 앤 드롭 기능을 위한 새로운 타입
export interface PatientTableColumn {
  id: string;
  label: string;
  flex: string;
  isVisible: boolean;
}

export interface ColumnOrder {
  [key: string]: PatientTableColumn[];
}
