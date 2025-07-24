import { Admin } from '@/models';

export interface InviteSendCodeRequest {
  phoneNumber: string;
}

export interface InviteSendCodeResponse {}

export interface GetAdminsRequest {}

export interface GetAdminsResponse {
  adminListItems: Admin[];
  adminCounts: number;
}
