import actionCreatorFactory from 'typescript-fsa';
import { TicketCreatePayload, TicketEntity } from './ticket.types';

const actionCreator = actionCreatorFactory('[TICKET]');

export const createTicketAction = actionCreator.async<TicketCreatePayload, TicketEntity>('CREATE');
export const getTicketsAction = actionCreator.async<void, TicketEntity[]>('GET_BY_DOCTOR');
