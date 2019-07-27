import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from './auth-wrapper';
import { StateProvider } from './contexts/statecontext';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_LOGIN_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    onRedirectCallback={onRedirectCallback}>
    <StateProvider>
      <App />
    </StateProvider>
  </Auth0Provider> , document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
