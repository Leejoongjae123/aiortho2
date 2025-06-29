import apiClient from '@/lib/axios';
import {
  DoctorProfileResponse,
  DoctorSignUpActivateCodeRequest,
  DoctorSignUpActivateCodeResponse,
} from './types';

const RESOURCE = '/ums/doctor';

export const doctorSignUpActivateCode = async (
  data: DoctorSignUpActivateCodeRequest
): Promise<DoctorSignUpActivateCodeResponse> =>
  await apiClient.post(`${RESOURCE}/signup/activatecode`, data);

export const getDoctorProfile = async (): Promise<DoctorProfileResponse> =>
  await apiClient.get(`${RESOURCE}`);
