import { Hospital, MedicalDepartment } from '@/models';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface FindIdRequest {
  name: string;
  phoneNumber: string;
}

export interface FindIdResponse {}

export interface FindIdVerifyRequest {
  phoneNumber: string;
  code: string;
}

export interface FindIdVerifyResponse {
  email: string;
}

export interface FindPasswordRequest {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface FindPasswordResponse {}

export interface FindPasswordVerifyRequest {
  email: string;
  phoneNumber: string;
  code: string;
}

export interface FindPasswordVerifyResponse {
  accessToken: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface ResetPasswordResponse {}

export interface CheckEmailRequest {
  email: string;
}

export interface CheckEmailResponse {}

export interface GetHospitalListRequest {}

export interface GetHospitalListResponse extends Array<Hospital> {}

export interface GetDepartmentListRequest {}

export interface GetDepartmentListResponse extends Array<MedicalDepartment> {}

export interface PostPhoneVerifyRequest {
  phoneNumber: string;
}

export interface PostPhoneVerifyResponse {}
