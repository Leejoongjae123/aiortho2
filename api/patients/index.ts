import apiClient from '@/lib/axios';
import {
  PostCreatePatientRequest,
  PostCreatePatientResponse,
  GetPatientListRequest,
  GetPatientListResponse,
  GetPatientRequest,
  GetPatientResponse,
  UpdatePatientRequest,
  UpdatePatientResponse,
} from './types';

const RESOURCE = '/ums/patients';

export const getPatient = async (params: GetPatientRequest): Promise<GetPatientResponse> =>
  await apiClient.get(`${RESOURCE}/${params.patientId}`);

export const getPatientList = async (
  params: GetPatientListRequest
): Promise<GetPatientListResponse> => await apiClient.get(`${RESOURCE}`, { params });

export const postPatientCreate = async (
  params: PostCreatePatientRequest
): Promise<PostCreatePatientResponse> => await apiClient.post(`${RESOURCE}`, params);

export const updatePatient = async ({
  patientId,
  params,
}: UpdatePatientRequest): Promise<UpdatePatientResponse> =>
  await apiClient.put(`${RESOURCE}/${patientId}`, params);
