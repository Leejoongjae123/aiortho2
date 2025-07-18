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

export interface DoctorProfile {
  adminId: string;
  email: string;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  medicalInstitutionId: string;
  departmentId: string;
  isVerified: true;
  specialty: string;
  hospitalCode: string;
}

export interface Nurse {
  id: number;
  name: string;
  department: string;
  license: string;
  experience?: string;
  phone: string;
}

export interface NurseProfile {
  adminId: string;
  email: string;
  name: string;
  phoneNumber: string;
  hospitalCode: string;
  doctorInfo: {
    name: string;
    adminId: string;
  };
}

export interface Patient {
  name: string;
  residentRegistrationNumber: string;
  hospitalPatientNum: string;
  guardianName: string;
  guardianPhoneNum: string;
  patientId: number;
  prescriptionStatus?: PrescriptionStatus;
  createdAt: string;
  updatedAt: string;
  prescription?: Prescription;
  license: string;
  doctorId?: string;
  doctorName?: string;
  gender: string;
  age: string;
  birth: string;
}

export interface Prescription {
  prescriptionId: string;
  name: string;
  patientId: number;
  createdAt: string;
  updatedAt: string;
  exercises: Exercise[];
  repeatCount: number;
  startDate: string;
  endDate: string;
}

export interface Exercise {
  exerciseId: string;
  name: string;
  duration: number;
  direction: ExerciseDirection;
}
