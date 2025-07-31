import {
  GetStandardProgramListResponse,
  GetStaticProgramExerciseListResponse,
  PostCreateStandardProgramRequest,
  PostCreateStandardProgramResponse,
  DeleteStandardProgramRequest,
  DeleteStandardProgramResponse,
  UpdateStandardProgramResponse,
  UpdateStandardProgramRequest,
} from './types';
import apiClient from '@/lib/axios';

const RESOURCE = '/ums/standardProgram';

export const getStandardProgramList = async (): Promise<GetStandardProgramListResponse> =>
  await apiClient.get(`${RESOURCE}`);

export const getStaticProgramExerciseList =
  async (): Promise<GetStaticProgramExerciseListResponse> =>
    await apiClient.get(`${RESOURCE}/programs`);

export const postCreateStandardProgram = async (
  params: PostCreateStandardProgramRequest
): Promise<PostCreateStandardProgramResponse> => await apiClient.post(`${RESOURCE}`, params);

export const deleteStandardProgram = async (
  params: DeleteStandardProgramRequest
): Promise<DeleteStandardProgramResponse> =>
  await apiClient.delete(`${RESOURCE}/${params.presetIndex}`);

export const updateStandardProgram = async ({
  presetIndex,
  ...params
}: UpdateStandardProgramRequest): Promise<UpdateStandardProgramResponse> =>
  await apiClient.put(`${RESOURCE}/${presetIndex}`, params);
