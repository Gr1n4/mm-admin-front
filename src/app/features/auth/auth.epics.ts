import { Epic, ResponseError } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import {
    confirmStaffAuthAction,
  loginAuthAction,
  logoutAuthAction,
  profileAuthAction,
  registerAuthAction,
  setProfileAuthAction,
} from './auth.actions';

export const loginAuthEpic: Epic = (action$, _, { authApi }) =>
  action$.pipe(
    ofAsyncAction(loginAuthAction),
    mergeMap(({ payload, done, failed }) => {
      return authApi.login(payload).pipe(
        mergeMap((profile) => {
          return of(done(profile), setProfileAuthAction(profile));
        }),
        catchError((err) => {
          return of(failed(err));
        }),
      );
    }),
  );

export const registerAuthEpic: Epic = (action$, _, { authApi }) =>
  action$.pipe(
    ofAsyncAction(registerAuthAction),
    mergeMap(({ payload, done, failed }) => {
      return authApi.register(payload).pipe(
        mergeMap(({ user, session }) => {
          return of(done({ user, session }), setProfileAuthAction({ user, session }));
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const confirmStaffAuthEpic: Epic = (action$, _, { authApi }) =>
  action$.pipe(
    ofAsyncAction(confirmStaffAuthAction),
    mergeMap(({ payload, done, failed }) => {
      return authApi.confirmStaff(payload).pipe(
        mergeMap(({ user, session }) => {
          return of(done({ user, session }), setProfileAuthAction({ user, session }));
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const logoutEpic: Epic = (action$, _, { authApi, history }) =>
  action$.pipe(
    ofAsyncAction(logoutAuthAction),
    mergeMap(({ done, failed }) => {
      return authApi.logout().pipe(
        mergeMap((res) => {
          if (res) {
            history.push('/auth');
            return of(done());
          }
          return of();
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

const getProfileAuthEpic: Epic = (action$, _, { authApi }) =>
  action$.pipe(
    ofAsyncAction(profileAuthAction),
    mergeMap(({ done, failed }) => {
      return authApi.profile().pipe(
        mergeMap((profile) => {
          return of(done(profile));
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const errorHandleEpic: Epic = (action$) =>
  action$.pipe(
    ofType(loginAuthAction.failed.type, registerAuthAction.failed.type),
    mergeMap((err: ResponseError) => {
      if (err) {
        alert(JSON.stringify(err, null, 2));
      }
      return of();
    }),
  );

const loginLoadingEpic = createAsyncSingleLoadingEpic(loginAuthAction, 'login');
const registerLoadingEpic = createAsyncSingleLoadingEpic(registerAuthAction, 'register');
const profileLoadingEpic = createAsyncSingleLoadingEpic(profileAuthAction, 'profile');

export const authEpics = combineEpics(
  loginAuthEpic,
  registerAuthEpic,
  confirmStaffAuthEpic,
  logoutEpic,
  getProfileAuthEpic,
  loginLoadingEpic,
  registerLoadingEpic,
  profileLoadingEpic,
  errorHandleEpic,
);
