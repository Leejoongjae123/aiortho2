import { Program, Exercise } from '@/models';

export interface GetStandardProgramListRequest {}

export interface GetStandardProgramListResponse {
  adminId: string;
  presets: Program[];
}

export interface GetStaticProgramExerciseListRequest {}

export interface GetStaticProgramExerciseListResponse extends Array<Exercise> {}

export interface PostCreateStandardProgramRequest extends Program {}

export interface PostCreateStandardProgramResponse {
  adminId: string;
  presets: Program[];
}

export interface DeleteStandardProgramRequest {
  presetIndex: number;
}

export interface DeleteStandardProgramResponse {
  adminId: string;
  presets: Program[];
}

export interface UpdateStandardProgramRequest {
  presetIndex: number;
  name: string;
  exercises: Exercise[];
  repeatCount: number;
}

export interface UpdateStandardProgramResponse {
  adminId: string;
  presets: Program[];
}
