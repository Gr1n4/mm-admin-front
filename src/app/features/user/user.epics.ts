import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import {
  addScheduleAction,
  createStaffAction,
  deleteScheduleAction,
  getDoctorByIdAction,
  searchUsersAction,
  updateDoctorByIdAction,
} from './user.action';

const createStaffEpic: Epic = (action$, _, { userApi }) =>
  action$.pipe(
    ofAsyncAction(createStaffAction),
    mergeMap(({ payload, done, failed }) => {
      return userApi.register(payload).pipe(
        mergeMap((user) => of(done(user))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const searchUsersEpic: Epic = (action$, _, { userApi }) =>
  action$.pipe(
    ofAsyncAction(searchUsersAction),
    mergeMap(({ payload, done, failed }) => {
      return userApi.search(payload).pipe(
        mergeMap((users) => of(done(users))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const createLoadingEpic = createAsyncSingleLoadingEpic(createStaffAction, 'staffCreate');
const searchLoadingEpic = createAsyncSingleLoadingEpic(searchUsersAction, 'userSearch');

export const userEpic = combineEpics(createStaffEpic, searchUsersEpic, createLoadingEpic, searchLoadingEpic);
