import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { createTicketAction, getTicketsAction } from './ticket.action';

const createTicketEpic: Epic = (action$, _, { ticketApi }) =>
  action$.pipe(
    ofAsyncAction(createTicketAction),
    mergeMap(({ payload, done, failed }) => {
      return ticketApi.create(payload).pipe(
        mergeMap((products) => of(done(products))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const getTicketsEpic: Epic = (action$, _, { ticketApi }) =>
  action$.pipe(
    ofAsyncAction(getTicketsAction),
    mergeMap(({ done, failed }) => {
      return ticketApi.getByDoctor().pipe(
        mergeMap((tickets) => of(done(tickets))),
        catchError((error) => of(failed(error))),
      );
    }),
  );

const createTicketLoadingEpic = createAsyncSingleLoadingEpic(createTicketAction, 'ticketCreate');

export const ticketEpic = combineEpics(createTicketEpic, getTicketsEpic, createTicketLoadingEpic);
