import { createSelector } from 'reselect';
import { AuthState } from './auth.types';

export const authSelector = <T extends { auth: AuthState }>(state: T) => state.auth;

export const isLogedinSelector = createSelector(authSelector, ({ isLogedin }) => isLogedin);
export const getUserSelector = createSelector(authSelector, ({ user }) => user);
export const getSessionSelector = createSelector(authSelector, ({ session }) => session);
