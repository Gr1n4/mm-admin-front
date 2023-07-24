import { mergeMap, Observable, of, catchError } from 'rxjs';
import { AsyncActionCreators } from 'typescript-fsa';
import { Epic, RoDependencies } from '@/types';
import { ofAsyncAction } from './of-async-action';

type ApiMethod<Payload, Result> = (dep: RoDependencies) => (payload: Payload) => Observable<Result>;

export function createAsyncEpic<Params, Result, Error = object>(
  asyncAction: AsyncActionCreators<Params, Result, Error>,
  apiMethod: ApiMethod<Params, Result>,
): Epic {
  return (action$, _, dep) =>
    action$.pipe(
      ofAsyncAction(asyncAction),
      mergeMap(({ payload, done, failed }) => {
        return apiMethod(dep)(payload).pipe(
          mergeMap((data) => of(done(data))),
          catchError((error: Error) => of(failed(error))),
        );
      }),
    );
}
