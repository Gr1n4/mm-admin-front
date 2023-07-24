import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { searchProductAction } from './home.action';

const searchProductEpic: Epic = (action$, _, { homeApi }) =>
  action$.pipe(
    ofAsyncAction(searchProductAction),
    mergeMap(({ done, failed }) => {
      return homeApi.search().pipe(
        mergeMap((products) => of(done(products))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const searchLoadingEpic = createAsyncSingleLoadingEpic(searchProductAction, 'productSearch');

export const homeEpic = combineEpics(searchProductEpic, searchLoadingEpic);
