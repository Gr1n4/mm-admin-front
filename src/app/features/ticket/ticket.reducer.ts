import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getTicketsAction } from './ticket.action';
import { TicketState } from './ticket.types';

const initialState: TicketState = {
  all: [],
};

export const ticketReducer = reducerWithInitialState(initialState).case(getTicketsAction.done, (state, { result }) => ({
  ...state,
  all: result,
}));
