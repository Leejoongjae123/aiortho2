import apiClient from '@/lib/axios';
import {
  PostCreatePatientRequest,
  PostCreatePatientResponse,
  GetPatientListRequest,
  GetPatientListResponse,
} from './types';

const RESOURCE = '/ums/patients';

export const getPatientList = async (
  params: GetPatientListRequest
): Promise<GetPatientListResponse> => await apiClient.get(`${RESOURCE}`, { params });

export const postPatientCreate = async (
  data: PostCreatePatientRequest
): Promise<PostCreatePatientResponse> => await apiClient.post(`${RESOURCE}`, data);
