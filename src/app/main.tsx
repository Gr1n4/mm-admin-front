import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'cropperjs/dist/cropper.min.css';

import { Root } from '@/components/root';
import { configureStore, rootEpic } from '@/store';
import { theme } from '../theme';
import { Router } from './components';
import { browserHistory } from './utils';
import { profileAuthAction } from './features/auth/auth.actions';

const rootDomNode = document.getElementById('root');
const store = configureStore({ epic: rootEpic, middlewares: [] });
store.dispatch(profileAuthAction.started());

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootDomNode!);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Router history={browserHistory}>
        <Root />
      </Router>
    </Provider>
  </ThemeProvider>,
);
