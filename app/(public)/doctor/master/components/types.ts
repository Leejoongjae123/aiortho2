export interface Doctor {
  id: string;
  code: string;
  name: string;
  email: string;
  date: string;
  isAdmin: boolean;
}

export interface DoctorTableProps {
  doctors: Doctor[];
}

export interface StatusBadgeProps {
  isAdmin: boolean;
}

export interface TableHeaderCellProps {
  label: string;
  flex: string;
}

export interface DoctorTableRowProps {
  doctor: Doctor;
  onRowClick: (doctor: Doctor) => void;
}
