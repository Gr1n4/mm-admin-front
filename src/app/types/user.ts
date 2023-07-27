import { BasicModel } from './common';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export interface UserEntity extends BasicModel {
  role: UserRole;
  email: string;
  isActive: boolean;
  authId: string;
}
