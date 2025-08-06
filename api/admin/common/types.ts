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

export interface GetHospitalListRequest {
  keyword: string;
  page: number;
  limit: number;
}

export interface GetHospitalListResponse {
  counts: number;
  hospitals: Hospital[];
}

export interface GetDepartmentListRequest {}

export interface GetDepartmentListResponse extends Array<MedicalDepartment> {}

export interface PostPhoneVerifySendRequest {
  phoneNumber: string;
}

export interface PostPhoneVerifySendResponse {}

export interface PostPhoneVerifyCheckRequest {
  phoneNumber: string;
  code: string;
}

export interface PostPhoneVerifyCheckResponse {}

export interface PostDeleteAccountRequest {
  adminId: string;
  password: string;
}

export interface PostDeleteAccountResponse {
  success: boolean;
  adminId: string;
}
