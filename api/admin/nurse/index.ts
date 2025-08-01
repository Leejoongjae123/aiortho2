import apiClient from '@/lib/axios';
import {
  GetNurseProfileResponse,
  PostNurseProfileVerifyRequest,
  PostNurseProfileVerifyResponse,
} from './types';

const RESOURCE = '/ums/nurse';

export const getNurseProfile = async (): Promise<GetNurseProfileResponse> =>
  await apiClient.get(`${RESOURCE}`);

export const postNurseProfileVerify = async (
  data: PostNurseProfileVerifyRequest
): Promise<PostNurseProfileVerifyResponse> => await apiClient.post(`${RESOURCE}/verify`, data);
