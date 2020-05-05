import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { Auth0Provider } from './auth-wrapper';
import { RedirectLoginResult } from '@auth0/auth0-spa-js';

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_LOGIN_DOMAIN ? process.env.REACT_APP_AUTH0_LOGIN_DOMAIN : ''}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID ? process.env.REACT_APP_AUTH0_CLIENT_ID : ''}
      redirect_uri={`${window.location.origin}`}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      onRedirectCallback={onRedirectCallback}>
         <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
