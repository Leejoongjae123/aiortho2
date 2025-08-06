export type UserRole = 'Root' | 'Doctor' | 'Nurse';

export enum PrescriptionStatus {
  Not_Created = 'not_created',
  Pending = 'pending',
  Prescripted = 'prescripted',
}

export const PrescriptionStatusLabel = {
  [PrescriptionStatus.Not_Created]: '처방전',
  [PrescriptionStatus.Pending]: '처방대기',
  [PrescriptionStatus.Prescripted]: '완료',
};

export enum ExerciseDirection {
  Left = 'left',
  Right = 'right',
}

export const ExerciseDirectionLabel = {
  [ExerciseDirection.Left]: '왼쪽 (Lt)',
  [ExerciseDirection.Right]: '오른쪽 (Rt)',
};

export type PatientListSortKey =
  | 'createdAt'
  | 'name'
  | 'age'
  | 'doctorName'
  | 'prescriptionStatus'
  | '_prescriptionstartDate'
  | '_prescriptionupdatedAt'
  | 'prescriptionStatus';

export interface Hospital {
  hospitalCode: string;
  name: string;
  typeCode: string;
  type: string;
  regionCode: string;
  city: string;
  districtCode: string;
  district: string;
  dong: string;
  zip: string;
  address: string;
}

export interface MedicalDepartment {
  code: string;
  name: string;
}

export interface Admin {
  adminId: string;
  no: string;
  signupCode: string;
  name: string;
  role: UserRole;
  email: string;
  createdAt: string;
}

export interface Doctor {
  signupCode: string;
  adminId: string;
  email: string;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  isVerified: boolean;
  hospitalCode: string;
  departmentCode: string;
  specialtyField?: string;
  specialistLicenseNumber?: string;
  nurseIds: string[];
  nurseInfos: Nurse[];
  specialityFieldInfo: {
    code: string;
    name: string;
  };
  hospitalInfo: {
    hospitalCode: string;
    name: string;
    address: string;
  };
  departmentInfo: {
    code: string;
    name: string;
  };
}

export interface Nurse {
  adminId: string;
  email: string;
  name: string;
  phoneNumber: string;
  hospitalCode: string;
  doctorInfo: {
    name: string;
    adminId: string;
  };
  hospitalInfo: {
    hospitalCode: string;
    name: string;
    address: string;
  };
}

export interface Patient {
  name: string;
  residentRegistrationNumber: string;
  hospitalPatientNum: string;
  guardianName: string;
  guardianPhoneNum: string;
  patientId: number;
  prescriptionStatus: PrescriptionStatus;
  createdAt: string;
  updatedAt: string;
  prescription?: Prescription;
  license?: string;
  doctorId?: string;
  doctorName?: string;
  gender: string;
  age: string;
  birth: string;
}

export interface Prescription {
  prescriptionId?: string;
  name: string;
  patientId?: number;
  createdAt?: string;
  updatedAt?: string;
  exercises: Exercise[];
  repeatCount: number;
  startDate?: string;
  endDate?: string;
}

export type Program = Pick<Prescription, 'name' | 'exercises' | 'repeatCount'>;

export interface Exercise {
  exerciseId: string;
  name: string;
  duration: number;
  direction: ExerciseDirection;
  description?: string;
}
