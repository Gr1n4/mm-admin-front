import { createSelector } from 'reselect';
import { TicketState } from './ticket.types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ticketSelector = <T extends { ticket: TicketState }>(state: T) => state.ticket;

export const getTicketsSelector = createSelector(ticketSelector, ({ all }) => all);
