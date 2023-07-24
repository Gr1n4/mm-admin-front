import { BrowserHistory } from 'history';
import { Epic as EpicRo } from 'redux-observable';
import { Action } from 'typescript-fsa';

import { AuthApi, HomeApi, ModApi, TicketApi, UserApi, VocabularyApi } from '@/features';
import { AuthState } from '@/features/auth/auth.types';
import { UserState } from '@/features/user/user.types';
import { ModState } from '@/features/mod/mod.types';

export interface BasicModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Option<T> = T | null;

export interface ResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface RoDependencies {
  authApi: AuthApi;
  homeApi: HomeApi;
  ticketApi: TicketApi;
  userApi: UserApi;
  vocabularyApi: VocabularyApi;
  modApi: ModApi;
  history: BrowserHistory;
}

export interface RootState {
  auth: AuthState;
  user: UserState;
  mod: ModState;
}

export type Epic<Input extends Action<any> = any, Output extends Input = Input> = EpicRo<
  Input,
  Output,
  RootState,
  RoDependencies
>;

export interface LangEntity<T = string> {
  ru: T;
  en: T;
}
