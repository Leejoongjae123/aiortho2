import apiClient from '@/lib/axios';
import {
  GetDoctorProfileResponse,
  PostDoctorMedicalLicenseCheckRequest,
  PostDoctorMedicalLicenseCheckResponse,
  PostDoctorSignUpActivateCodeRequest,
  PostDoctorSignUpActivateCodeResponse,
  GetSearchNursesRequest,
  GetSearchNursesResponse,
  PostDoctorSignUpRequest,
  PostDoctorSignUpResponse,
  PostDoctorProfileVerifyResponse,
  PostDoctorProfileVerifyRequest,
  PutDoctorProfileResponse,
  PutDoctorProfileRequest,
} from './types';

const RESOURCE = '/ums/doctor';

export const postDoctorSignUpActivateCode = async (
  data: PostDoctorSignUpActivateCodeRequest
): Promise<PostDoctorSignUpActivateCodeResponse> =>
  await apiClient.post(`${RESOURCE}/signup/activatecode`, data);

export const getDoctorProfile = async (): Promise<GetDoctorProfileResponse> =>
  await apiClient.get(`${RESOURCE}`);

export const postDoctorMedicalLicenseCheck = async (
  data: PostDoctorMedicalLicenseCheckRequest,
  token: string
): Promise<PostDoctorMedicalLicenseCheckResponse> =>
  await apiClient.post(`${RESOURCE}/check/license`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSearchNurses = async (
  params: GetSearchNursesRequest
): Promise<GetSearchNursesResponse> => await apiClient.get(`${RESOURCE}/nurses`, { params });

export const postDoctorSignUp = async (
  token: string,
  data: PostDoctorSignUpRequest
): Promise<PostDoctorSignUpResponse> =>
  await apiClient.post(`${RESOURCE}/signup`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const postDoctorProfileVerify = async (
  data: PostDoctorProfileVerifyRequest
): Promise<PostDoctorProfileVerifyResponse> => await apiClient.post(`${RESOURCE}/verify`, data);

export const putDoctorProfile = async (
  data: PutDoctorProfileRequest
): Promise<PutDoctorProfileResponse> => await apiClient.put(`${RESOURCE}`, data);
