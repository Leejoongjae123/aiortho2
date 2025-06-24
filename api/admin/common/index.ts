import apiClient from '@/lib/axios';

import {
  LoginRequest,
  LoginResponse,
  FindIdRequest,
  FindIdResponse,
  FindIdVerifyResponse,
  FindIdVerifyRequest,
  FindPasswordRequest,
  FindPasswordResponse,
  FindPasswordVerifyRequest,
  FindPasswordVerifyResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from './types';

const RESOURCE = '/ums/common';

export const login = async (data: LoginRequest): Promise<LoginResponse> =>
  await apiClient.post(`${RESOURCE}/login`, data);

export const findId = async (data: FindIdRequest): Promise<FindIdResponse> =>
  await apiClient.post(`${RESOURCE}/find/id`, data);

export const findIdVerify = async (data: FindIdVerifyRequest): Promise<FindIdVerifyResponse> =>
  await apiClient.post(`${RESOURCE}/find/id/verify`, data);

export const findPassword = async (data: FindPasswordRequest): Promise<FindPasswordResponse> =>
  await apiClient.post(`${RESOURCE}/find/passwd`, data);

export const findPasswordVerify = async (
  data: FindPasswordVerifyRequest
): Promise<FindPasswordVerifyResponse> =>
  await apiClient.post(`${RESOURCE}/find/passwd/verify`, data);

export const resetPassword = async (
  data: ResetPasswordRequest,
  token: string
): Promise<ResetPasswordResponse> =>
  await apiClient.post(`${RESOURCE}/reset/passwd`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
