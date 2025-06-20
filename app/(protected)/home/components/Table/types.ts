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
  statusType: 'waiting' | 'prescription';
}

export interface StatusBadgeProps {
  status: string;
  type: 'waiting' | 'prescription';
}

export interface TableColumn {
  id: string;
  label: string;
  flex: string;
  key: keyof PatientData;
}

export interface DraggableTableHeaderCellProps {
  column: TableColumn;
  index: number;
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
  statusType: 'waiting' | 'prescription';
  columnOrder: TableColumn[];
}
