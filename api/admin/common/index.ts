import apiClient from '@/lib/axios';

import {
  LoginRequest,
  LoginResponse,
  FindIdRequest,
  FindIdResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from './types';

const RESOURCE = '/ums/common';

export const login = async (data: LoginRequest): Promise<LoginResponse> =>
  await apiClient.post(`${RESOURCE}/login`, data);

export const findId = async (data: FindIdRequest): Promise<FindIdResponse> =>
  await apiClient.post(`${RESOURCE}/find/id`, data);

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> =>
  await apiClient.post(`${RESOURCE}/reset/passwd`, data);
