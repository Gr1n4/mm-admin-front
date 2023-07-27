import { BasicModel, Option, UserEntity } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ConfirmStaffPayload {
  authId: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface SessionEntity extends BasicModel {
  city: string;
}

export interface ProfileResponse {
  user: UserEntity;
  session: SessionEntity;
}

export interface AuthState {
  user: Option<UserEntity>;
  session: Option<SessionEntity>;
  isLogedin: boolean;
}
