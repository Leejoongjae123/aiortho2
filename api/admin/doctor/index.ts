import apiClient from '@/lib/axios';
import { DoctorSignUpActivateCodeRequest, DoctorSignUpActivateCodeResponse } from './types';

const RESOURCE = '/ums/doctor';

export const doctorSignUpActivateCode = async (
  data: DoctorSignUpActivateCodeRequest
): Promise<DoctorSignUpActivateCodeResponse> =>
  await apiClient.post(`${RESOURCE}/signup/activatecode`, data);
