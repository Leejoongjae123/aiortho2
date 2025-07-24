import { Doctor } from '@/models';

export interface DoctorSignUpActivateCodeRequest {
  code: string;
}

export interface DoctorSignUpActivateCodeResponse {
  signupToken: string;
}

export interface GetDoctorProfileRequest {}

export interface GetDoctorProfileResponse extends Doctor {}
