import apiClient from '@/lib/axios';
import { InviteSendCodeRequest, InviteSendCodeResponse } from './type';

const RESOURCE = '/ums/root';

export const inviteSendCode = async (
  data: InviteSendCodeRequest
): Promise<InviteSendCodeResponse> => await apiClient.post(`${RESOURCE}/invite/send`, data);
