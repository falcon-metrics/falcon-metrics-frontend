import './styles/app.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import LoadingScreen from 'components/LoadingScreen';
import config from 'core/auth/auth_config';
import history from 'core/history';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import { Router } from 'react-router-dom';
import theme from 'styles/theme';

import { Auth0Provider } from '@auth0/auth0-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { LicenseInfo } from '@mui/x-data-grid-pro';

import * as serviceWorker from './serviceWorker';

LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_DATA_GRID_KEY ?? '');

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <Auth0Provider
          domain={config.domain}
          clientId={config.clientId}
          scope="read:current_user"
          audience="https://example.auth0.com/api/v2/"
          redirectUri={window.location.origin}
        >
          <CssBaseline />
          <Router history={history}>
            <Suspense fallback={<LoadingScreen />}>
              <SnackbarProvider maxSnack={3}>
                <App />
              </SnackbarProvider>
            </Suspense>
          </Router>
        </Auth0Provider>
      </ConfirmProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
