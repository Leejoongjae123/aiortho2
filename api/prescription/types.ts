import { Prescription } from '@/models';

export interface GetActivePrescriptionRequest {
  patientId: string;
}

export interface GetActivePrescriptionResponse extends Prescription {}
