import { authReducer } from '@/features/auth/auth.reducer';
import { homeReducer } from '@/features/home/home.reducer';
import { modReducer } from '@/features/mod/mod.reducer';
import { userReducer } from '@/features/user/user.reducer';
import { loadingReducer } from '@ro-loading';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  user: userReducer,
  mod: modReducer,
  loading: loadingReducer,
});
