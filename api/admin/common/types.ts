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

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface ResetPasswordResponse {}
