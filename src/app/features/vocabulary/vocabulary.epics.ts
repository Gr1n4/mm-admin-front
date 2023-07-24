import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import {
  createDepartmentAction,
  createVocabularyAction,
  getDepartmentsAction,
  searchVocabularyAction,
} from './vocabulary.action';

const createVocabularyEpic: Epic = (action$, _, { vocabularyApi }) =>
  action$.pipe(
    ofAsyncAction(createVocabularyAction),
    mergeMap(({ payload, done, failed }) => {
      return vocabularyApi.create(payload).pipe(
        mergeMap((vocabulary) => of(done(vocabulary))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const createDepartmentEpic: Epic = (action$, _, { vocabularyApi }) =>
  action$.pipe(
    ofAsyncAction(createDepartmentAction),
    mergeMap(({ payload, done, failed }) => {
      return vocabularyApi.createDepartment(payload).pipe(
        mergeMap((dep) => of(done(dep))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const searchVocabularyEpic: Epic = (action$, _, { vocabularyApi }) =>
  action$.pipe(
    ofAsyncAction(searchVocabularyAction),
    mergeMap(({ done, failed }) => {
      return vocabularyApi.search().pipe(
        mergeMap((vocabularies) => of(done(vocabularies))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const getDepartmentsEpic: Epic = (action$, _, { vocabularyApi }) =>
  action$.pipe(
    ofAsyncAction(getDepartmentsAction),
    mergeMap(({ done, failed }) => {
      return vocabularyApi.getDepartments().pipe(
        mergeMap((vocabularies) => of(done(vocabularies))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const createLoadingEpic = createAsyncSingleLoadingEpic(createVocabularyAction, 'vocabularyCreate');
const createDepartmentLoadingEpic = createAsyncSingleLoadingEpic(createDepartmentAction, 'departmentCreate');
const searchLoadingEpic = createAsyncSingleLoadingEpic(searchVocabularyAction, 'vocabularySearch');
const getDepartmentLoadingEpic = createAsyncSingleLoadingEpic(getDepartmentsAction, 'departmentSearch');

export const vocabularyEpic = combineEpics(
  createVocabularyEpic,
  createDepartmentEpic,
  searchVocabularyEpic,
  getDepartmentsEpic,
  createDepartmentLoadingEpic,
  createLoadingEpic,
  searchLoadingEpic,
  getDepartmentLoadingEpic,
);
