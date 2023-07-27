import { authEpics, homeEpic, modEpic, userEpic } from '@/features';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(authEpics, homeEpic, userEpic, modEpic);
