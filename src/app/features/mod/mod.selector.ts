import { createSelector } from 'reselect';
import { ModState } from './mod.types';

export const modSelector = <T extends { mod: ModState }>(state: T) => state.mod;

export const getFeedModSelector = createSelector(modSelector, ({ feed }) => feed);
export const getByIdModSelector = createSelector(modSelector, ({ byId }) => byId);
