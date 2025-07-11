import apiClient from '@/lib/axios';
import { PatientListRequest, PatientListResponse } from './types';

const RESOURCE = '/ums/patients';

export const getPatientList = async (params: PatientListRequest): Promise<PatientListResponse> =>
  await apiClient.get(`${RESOURCE}`, { params });
