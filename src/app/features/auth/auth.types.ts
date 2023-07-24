import { BasicModel, Option, UserEntity, UserSex } from '@/types';

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
