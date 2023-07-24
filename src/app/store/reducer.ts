import { authReducer } from '@/features/auth/auth.reducer';
import { homeReducer } from '@/features/home/home.reducer';
import { modReducer } from '@/features/mod/mod.reducer';
import { ticketReducer } from '@/features/ticket/ticket.reducer';
import { userReducer } from '@/features/user/user.reducer';
import { vocabularyReducer } from '@/features/vocabulary/vocabulary.reducer';
import { loadingReducer } from '@ro-loading';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  ticket: ticketReducer,
  user: userReducer,
  vocabulary: vocabularyReducer,
  mod: modReducer,
  loading: loadingReducer,
});
