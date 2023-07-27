import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  addScheduleAction,
  createStaffAction,
  getDoctorByIdAction,
  searchUsersAction,
  updateDoctorByIdAction,
} from './user.action';
import { UserState } from './user.types';

const initialState: UserState = {
  all: [],
  user: null,
};

export const userReducer = reducerWithInitialState(initialState)
  .case(getDoctorByIdAction.done, (state, { result }) => ({ ...state, doctor: result }))
  .case(updateDoctorByIdAction.done, (state, { result }) => ({ ...state, doctor: result }))
  .case(searchUsersAction.done, (state, { result }) => ({ ...state, all: result }))
  .case(createStaffAction.done, (state, { result }) => ({ ...state, all: R.prepend(result, state.all) }));
