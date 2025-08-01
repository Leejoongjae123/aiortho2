import { Nurse } from '@/models';

export interface GetNurseProfileRequest {}

export interface GetNurseProfileResponse extends Nurse {}

export interface PostNurseProfileVerifyRequest {
  email: string;
  password: string;
}

export interface PostNurseProfileVerifyResponse {}
