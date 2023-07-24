import { AuthApi, HomeApi, ModApi, TicketApi, UserApi, VocabularyApi } from '@/features';
import { RoDependencies } from '@/types';
import { browserHistory } from '@/utils';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { rootReducer } from './reducer';

interface ConfigureStoreOptions {
  epic: Epic;
  middlewares: Middleware[];
}

function configureDependency(): RoDependencies {
  return {
    history: browserHistory,
    authApi: new AuthApi(),
    homeApi: new HomeApi(),
    ticketApi: new TicketApi(),
    userApi: new UserApi(),
    vocabularyApi: new VocabularyApi(),
    modApi: new ModApi(),
  };
}

export function configureStore({ epic, middlewares = [] }: ConfigureStoreOptions): Store<unknown> {
  const dependencies = configureDependency();
  const epicMiddleware = createEpicMiddleware({
    dependencies,
  });
  // TODO (luchko): add compose from redux for production build before release.
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware, ...middlewares)));
  epicMiddleware.run(epic);

  return store;
}
