import { DepartmentEntity } from '@/features/vocabulary/vocabulary.types';
import { BasicModel } from './common';
import { ScheduleEntity } from './schedule';

export interface InterestEntity extends BasicModel {
  title: string;
}

export enum UserSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export interface UserEntity extends BasicModel {
  role: UserRole;
  firstName: string;
  lastName: string;
  surename: string;
  country: string;
  city: string;
  street: string;
  house: string;
  appartment: string;
  sex: UserSex;
  age: Date;
  email: string;
  phoneNumber: string;
  departments: DepartmentEntity[];
  schedules: ScheduleEntity[];
}
