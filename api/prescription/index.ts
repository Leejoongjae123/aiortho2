import apiClient from '@/lib/axios';
import {
  GetActivePrescriptionRequest,
  GetActivePrescriptionResponse,
  GetPrescriptionHistoryRequest,
  GetPrescriptionHistoryResponse,
  PostCreatePrescriptionRequest,
  PostCreatePrescriptionResponse,
} from './types';

const RESOURCE = '/ums/prescriptions';

export const getActivePrescription = async (
  params: GetActivePrescriptionRequest
): Promise<GetActivePrescriptionResponse> =>
  await apiClient.get(`${RESOURCE}/${params.patientId}/inprogress`);

export const getPrescriptionHistory = async (
  patientId: number,
  params: GetPrescriptionHistoryRequest
): Promise<GetPrescriptionHistoryResponse> =>
  await apiClient.get(`${RESOURCE}/${patientId}/history`, { params });

export const postCreatePrescription = async (
  params: PostCreatePrescriptionRequest
): Promise<PostCreatePrescriptionResponse> => await apiClient.post(`${RESOURCE}`, params);
