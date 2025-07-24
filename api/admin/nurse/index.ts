import apiClient from '@/lib/axios';
import { GetNurseProfileResponse } from './types';

const RESOURCE = '/ums/nurse';

export const getNurseProfile = async (): Promise<GetNurseProfileResponse> =>
  await apiClient.get(`${RESOURCE}`);
