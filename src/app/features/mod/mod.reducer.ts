import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { feedModAction, getByIdModAction } from './mod.action';
import { ModState } from './mod.types';

const initialState: ModState = {
  feed: [],
  byId: null,
};

export const modReducer = reducerWithInitialState(initialState)
  .case(getByIdModAction.done, (state, { result }) => ({ ...state, byId: result }))
  .case(feedModAction.done, (state, { result }) => ({ ...state, feed: result }));
