import { DoctorProfile } from '@/models';

export interface DoctorSignUpActivateCodeRequest {
  code: string;
}

export interface DoctorSignUpActivateCodeResponse {
  signupToken: string;
}

export interface DoctorProfileRequest {}

export interface DoctorProfileResponse extends DoctorProfile {}
