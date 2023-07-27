import { Option, UserEntity, UserRole } from '@/types';

export enum StaffRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export interface StaffCreatePayload {
  email: string;
  role: StaffRole;
}

export type StaffUpdatePayload = Partial<StaffCreatePayload>;

export interface UserSearchPayload {
  role: UserRole[];
}

export interface UserState {
  all: UserEntity[];
  user: Option<UserEntity>;
}
