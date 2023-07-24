import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { searchProductAction } from './home.action';
import { HomeState } from './home.types';

const initialState: HomeState = {
  all: [],
};

export const homeReducer = reducerWithInitialState(initialState).case(
  searchProductAction.done,
  (state, { result }) => ({ ...state, all: result }),
);
