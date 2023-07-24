import { authEpics, homeEpic, modEpic, ticketEpic, userEpic, vocabularyEpic } from '@/features';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(authEpics, homeEpic, ticketEpic, userEpic, vocabularyEpic, modEpic);
