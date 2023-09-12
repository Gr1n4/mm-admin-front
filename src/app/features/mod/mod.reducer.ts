import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { feedModAction, getByIdModAction, removeByIdModAction, sortedFeedModAction } from './mod.action';
import { ModState, ModType } from './mod.types';
import { omit } from 'ramda';

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
  .case(removeByIdModAction.done, (state, { params: modId }) => {
    const { type } = state.record[modId];
    const record = omit([modId], state.record);
    const sortedIds = {
      ...state.sortedIds,
      [type]: state.sortedIds[type].filter((id) => id !== modId),
    };
    return {
      ...state,
      record,
      sortedIds,
    };
  })
  .case(feedModAction.done, (state, { result }) => ({ ...state, feed: result }));
