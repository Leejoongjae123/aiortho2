export type UserRole = 'Root' | 'Doctor' | 'Nurse';

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
