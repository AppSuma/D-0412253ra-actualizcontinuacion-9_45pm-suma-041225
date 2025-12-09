export type RoleType = 'MEDICO' | 'ENFERMERO' | 'PARAMEDICO' | 'PRIMER_RESPONDIENTE';

export interface PatientData {
  name: string;
  age: string;
  sex: string;
  medication: string;
  history: string;
}

export interface ClinicalCase {
  id: string;
  patientName: string;
  date: string;
  diagnosis_summary: string;
  isProtected: boolean;
  data: PatientData;
  roleUsed: RoleType;
}

export interface AccessCode {
  code: string;
  type: '24H' | 'MONTHLY';
  status: 'AVAILABLE' | 'ACTIVE' | 'BLOCKED' | 'EXPIRED' | 'USED';
  createdAt: string;
  expiresAt?: string;
  assignedTo?: string;
  phoneNumber?: string;
  deviceId?: string;
  activatedAt?: string;
}
