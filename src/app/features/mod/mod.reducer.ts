import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { feedModAction, getByIdModAction, sortedFeedModAction } from './mod.action';
import { ModState, ModType } from './mod.types';

const initialState: ModState = {
  feed: [],
  record: {},
  sortedIds: {
    [ModType.MOD]: [],
    [ModType.SEED]: [],
    [ModType.SKIN]: [],
    [ModType.MAP]: [],
  },
  byId: null,
};

export const modReducer = reducerWithInitialState(initialState)
  .case(getByIdModAction.done, (state, { result }) => ({ ...state, byId: result }))
  .case(sortedFeedModAction.done, (state, { result }) => ({ ...state, ...result }))
  .case(feedModAction.done, (state, { result }) => ({ ...state, feed: result }));
