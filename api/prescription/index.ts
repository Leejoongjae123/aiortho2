import apiClient from '@/lib/axios';
import { GetActivePrescriptionRequest, GetActivePrescriptionResponse } from './types';

const RESOURCE = '/ums/prescriptions';

export const getActivePrescription = async (
  params: GetActivePrescriptionRequest
): Promise<GetActivePrescriptionResponse> =>
  await apiClient.get(`${RESOURCE}/${params.patientId}/inprogress`);
