import { Patient } from '@/models';

export interface PatientListRequest {
  count: number;
  pageNumber: number;
  searchKey?: string;
  findMyPatient?: boolean;
  ascending?: boolean;
  sortBy?: string;
}

export interface PatientListResponse {
  pageCount: number;
  patients: Patient[];
  totalCount: number;
}
