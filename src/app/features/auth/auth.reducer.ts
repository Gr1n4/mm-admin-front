import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { logoutAuthAction, profileAuthAction, setProfileAuthAction } from './auth.actions';
import { AuthState } from './auth.types';

const initialState: AuthState = {
  session: null,
  user: null,
  isLogedin: false,
};

export const authReducer = reducerWithInitialState(initialState)
  .case(setProfileAuthAction, (state, { user, session }) => ({ ...state, user, session, isLogedin: true }))
  .case(profileAuthAction.done, (state, { result: { user, session } }) => ({
    ...state,
    user,
    session,
    isLogedin: true,
  }))
  .case(logoutAuthAction.done, (state) => ({ ...state, user: null, session: null, isLogedin: false }));
