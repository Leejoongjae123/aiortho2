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
  CheckEmailRequest,
  CheckEmailResponse,
  GetHospitalListResponse,
  GetDepartmentListResponse,
  PostPhoneVerifyRequest,
  PostPhoneVerifyResponse,
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

export const checkEmail = async (data: CheckEmailRequest): Promise<CheckEmailResponse> =>
  await apiClient.post(`${RESOURCE}/check/email`, data);

export const getHospitalList = async (): Promise<GetHospitalListResponse> =>
  await apiClient.get(`${RESOURCE}/hospitals`);

export const getDepartmentList = async (): Promise<GetDepartmentListResponse> =>
  await apiClient.get(`${RESOURCE}/departments`);

export const postPhoneVerifySend = async (
  data: PostPhoneVerifyRequest
): Promise<PostPhoneVerifyResponse> => await apiClient.post(`${RESOURCE}/phoneverify/send`, data);
