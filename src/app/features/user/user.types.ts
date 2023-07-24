import { Option, UserEntity, UserRole, UserSex } from '@/types';

export enum StaffRole {
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export interface StaffCreatePayload {
  email: string;
  role: StaffRole;
  firstName: string;
  lastName: string;
  surename: string;
  phoneNumber: string;
  sex: UserSex;
  birthDate: Date;
  country: string;
  city: string;
  street: string;
  house: string;
  appartment: string;
  passport: string;
  medicalInsurance: string;
  departamentIds?: string[];
}

export type StaffUpdatePayload = Partial<StaffCreatePayload>;

export interface UserSearchPayload {
  role: UserRole[];
}

export interface UserState {
  all: UserEntity[];
  doctor: Option<UserEntity>;
}
