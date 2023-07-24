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
import { getDoctorSelector } from './user.selector';

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

const getDoctorByIdEpic: Epic = (action$, _, { userApi }) =>
  action$.pipe(
    ofAsyncAction(getDoctorByIdAction),
    mergeMap(({ payload, done, failed }) => {
      return userApi.getById(payload).pipe(
        mergeMap((user) => of(done(user))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const updateDoctorByIdEpic: Epic = (action$, store$, { userApi }) =>
  action$.pipe(
    ofAsyncAction(updateDoctorByIdAction),
    mergeMap(({ payload, done, failed }) => {
      const doctor = getDoctorSelector(store$.value);
      if (!doctor) {
        return of();
      }
      return userApi.updateById(doctor.id, payload).pipe(
        mergeMap((user) => of(done(user))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const addScheduleEpic: Epic = (action$, _, { userApi }) =>
  action$.pipe(
    ofAsyncAction(addScheduleAction),
    mergeMap(({ payload, done, failed }) => {
      return userApi.addSchedule(payload).pipe(
        mergeMap((user) => of(done(user))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const deleteScheduleEpic: Epic = (action$, _, { userApi }) =>
  action$.pipe(
    ofAsyncAction(deleteScheduleAction),
    mergeMap(({ payload, done, failed }) => {
      return userApi.deleteSchedule(payload).pipe(
        mergeMap(() => of(done())),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const createLoadingEpic = createAsyncSingleLoadingEpic(createStaffAction, 'staffCreate');
const searchLoadingEpic = createAsyncSingleLoadingEpic(searchUsersAction, 'userSearch');

export const userEpic = combineEpics(
  createStaffEpic,
  updateDoctorByIdEpic,
  searchUsersEpic,
  getDoctorByIdEpic,
  addScheduleEpic,
  deleteScheduleEpic,
  createLoadingEpic,
  searchLoadingEpic,
);
