import apiClient from '@/lib/axios';
import {
  GetNurseProfileResponse,
  PostNurseProfileVerifyRequest,
  PostNurseProfileVerifyResponse,
  PostNurseSignUpRequest,
  PostNurseSignUpResponse,
  PostUpdateNurseProfileRequest,
  PostUpdateNurseProfileResponse,
} from './types';

const RESOURCE = '/ums/nurse';

export const getNurseProfile = async (): Promise<GetNurseProfileResponse> =>
  await apiClient.get(`${RESOURCE}`);

export const postNurseProfileVerify = async (
  data: PostNurseProfileVerifyRequest
): Promise<PostNurseProfileVerifyResponse> => await apiClient.post(`${RESOURCE}/verify`, data);

export const putUpdateNurseProfile = async (
  data: PostUpdateNurseProfileRequest
): Promise<PostUpdateNurseProfileResponse> => await apiClient.put(`${RESOURCE}`, data);

export const postNurseSignUp = async (
  data: PostNurseSignUpRequest
): Promise<PostNurseSignUpResponse> => await apiClient.post(`${RESOURCE}/signup`, data);
