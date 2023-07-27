import { createSelector } from 'reselect';
import { UserState } from './user.types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const userSelector = <T extends { user: UserState }>(state: T) => state.user;

export const getUsersSelector = createSelector(userSelector, ({ all }) => all);
