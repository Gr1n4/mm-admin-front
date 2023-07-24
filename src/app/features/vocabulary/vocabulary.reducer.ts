import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  createDepartmentAction,
  createVocabularyAction,
  getDepartmentsAction,
  searchVocabularyAction,
} from './vocabulary.action';
import { VocabularyState } from './vocabulary.types';

const initialState: VocabularyState = {
  all: [],
  departments: [],
};

export const vocabularyReducer = reducerWithInitialState(initialState)
  .case(searchVocabularyAction.done, (state, { result }) => ({ ...state, all: result }))
  .case(getDepartmentsAction.done, (state, { result }) => ({ ...state, departments: result }))
  .case(createDepartmentAction.done, (state, { result }) => ({
    ...state,
    departments: R.prepend(result, state.departments),
  }))
  .case(createVocabularyAction.done, (state, { result }) => ({ ...state, all: R.prepend(result, state.all) }));
