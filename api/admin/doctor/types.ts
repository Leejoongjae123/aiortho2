import { Doctor, Nurse } from '@/models';

export interface PostDoctorSignUpActivateCodeRequest {
  code: string;
}

export interface PostDoctorSignUpActivateCodeResponse {
  signupToken: string;
}

export interface GetDoctorProfileRequest {}

export interface GetDoctorProfileResponse extends Doctor {}

export interface PostDoctorMedicalLicenseCheckRequest {
  licenseNumber: string;
}

export interface PostDoctorMedicalLicenseCheckResponse {}

export interface GetSearchNursesRequest {
  page: number;
  limit: number;
  keyword: string;
}

export interface GetSearchNursesResponse {
  counts: number;
  nurses: Nurse[];
}

export interface PostDoctorSignUpRequest {
  signupCode: string;
  email: string;
  password: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  hospitalCode: string;
  departmentCode: string;
  specialtyField?: string;
  specialistLicenseNumber?: string;
  nurseIds?: string[];
}

export interface PostDoctorSignUpResponse {}

export interface PostDoctorProfileVerifyRequest {
  email: string;
  password: string;
}

export interface PostDoctorProfileVerifyResponse {}

export interface PutDoctorProfileRequest {
  password?: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  hospitalCode: string;
  departmentCode: string;
  specialtyField?: string;
  specialistLicenseNumber?: string;
  nurseIds?: string[];
}

export interface PutDoctorProfileResponse {}
