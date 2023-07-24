import { ResponseError } from '@/types';
import actionCreatorFactory from 'typescript-fsa';
import { ConfirmStaffPayload, LoginPayload, ProfileResponse, RegisterPayload } from './auth.types';

const actionCreator = actionCreatorFactory('[AUTH]');

export const setProfileAuthAction = actionCreator<ProfileResponse>('SET_PROFILE');

export const loginAuthAction = actionCreator.async<LoginPayload, ProfileResponse, ResponseError>('LOGIN');
export const registerAuthAction = actionCreator.async<RegisterPayload, ProfileResponse, ResponseError>('REGISTER');
export const confirmStaffAuthAction = actionCreator.async<ConfirmStaffPayload, ProfileResponse, ResponseError>('CONFIRM_STAFF');
export const profileAuthAction = actionCreator.async<void, ProfileResponse, ResponseError>('PROFILE');
export const logoutAuthAction = actionCreator.async<void, void, ResponseError>('LOGOUT');
