import apiClient from '@/lib/axios';
import { NurseProfileResponse } from './types';

const RESOURCE = '/ums/nurse';

export const getNurseProfile = async (): Promise<NurseProfileResponse> =>
  await apiClient.get(`${RESOURCE}`);
