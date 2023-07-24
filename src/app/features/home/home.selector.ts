import { createSelector } from 'reselect';
import { HomeState } from './home.types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const homeSelector = <T extends { home: HomeState }>(state: T) => state.home;

export const getProductsSelector = createSelector(homeSelector, ({ all }) => all);
