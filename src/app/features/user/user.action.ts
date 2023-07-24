import { ScheduleCreatePayload, ScheduleEntity, UserEntity } from '@/types';
import actionCreatorFactory from 'typescript-fsa';
import { StaffCreatePayload, StaffUpdatePayload, UserSearchPayload } from './user.types';

const actionCreator = actionCreatorFactory('[USER]');

export const searchUsersAction = actionCreator.async<UserSearchPayload, UserEntity[]>('SEARCH');
export const createStaffAction = actionCreator.async<StaffCreatePayload, UserEntity>('CREATE');
export const getDoctorByIdAction = actionCreator.async<string, UserEntity>('GET_DOCTOR_BY_ID');
export const updateDoctorByIdAction = actionCreator.async<StaffUpdatePayload, UserEntity>('UPDATE_DOCTOR_BY_ID');
export const addScheduleAction = actionCreator.async<ScheduleCreatePayload, ScheduleEntity>('ADD_SCHEDULE');
export const deleteScheduleAction = actionCreator.async<string, void>('DELETE_SCHEDULE');
