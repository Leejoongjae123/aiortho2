import { Patient, PatientListSortKey } from '@/models';

export interface GetPatientRequest {
  patientId: string;
}

export interface GetPatientResponse extends Patient {}

export interface GetPatientListRequest {
  count: number;
  pageNumber: number;
  searchKey?: string;
  findMyPatient?: boolean;
  ascending?: boolean;
  sortBy?: PatientListSortKey;
}

export interface GetPatientListResponse {
  pageCount: number;
  patients: Patient[];
  totalCount: number;
}

export interface PostCreatePatientRequest {
  name: string;
  residentRegistrationNumber: string;
  hospitalPatientNum: string;
  guardianName: string;
  guardianPhoneNum: string;
}

export interface PostCreatePatientResponse extends Patient {}
