import {
  GetStandardProgramListResponse,
  GetStaticProgramExerciseListResponse,
  PostCreateStandardProgramRequest,
  PostCreateStandardProgramResponse,
} from './types';
import apiClient from '@/lib/axios';

const RESOURCE = '/ums/standardProgram';

export const getStandardProgramList = async (): Promise<GetStandardProgramListResponse> =>
  await apiClient.get(`${RESOURCE}`);

export const getStaticProgramExerciseList =
  async (): Promise<GetStaticProgramExerciseListResponse> =>
    await apiClient.get(`${RESOURCE}/programs`);

export const postCreateStandardProgram = async (
  request: PostCreateStandardProgramRequest
): Promise<PostCreateStandardProgramResponse> => await apiClient.post(`${RESOURCE}`, request);
