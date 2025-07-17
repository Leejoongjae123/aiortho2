import apiClient from '@/lib/axios';
import {
  PostCreatePatientRequest,
  PostCreatePatientResponse,
  GetPatientListRequest,
  GetPatientListResponse,
  GetPatientRequest,
  GetPatientResponse,
} from './types';

const RESOURCE = '/ums/patients';

export const getPatient = async (params: GetPatientRequest): Promise<GetPatientResponse> =>
  await apiClient.get(`${RESOURCE}/${params.patientId}`);

export const getPatientList = async (
  params: GetPatientListRequest
): Promise<GetPatientListResponse> => await apiClient.get(`${RESOURCE}`, { params });

export const postPatientCreate = async (
  data: PostCreatePatientRequest
): Promise<PostCreatePatientResponse> => await apiClient.post(`${RESOURCE}`, data);
