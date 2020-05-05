import React, { FC }from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from './auth-wrapper';
import { connect } from 'react-redux';
import { match, withRouter } from 'react-router-dom';
import Preloader from './components/preloader/preloader';
import Navbar from './components/navbar/navbar';
import Routes from './routes/routes';

interface AppProps {
}

const App : FC<AppProps> = (props: AppProps) => {
  const authContext = useAuth0();
  const getTokenSilently = authContext && authContext.getTokenSilently;
  const loading = authContext && authContext.loading;
  const isAuthenticated = authContext && authContext.isAuthenticated;

  return(
    <div className='App'>
      {loading && (
        <Preloader />
      )}

      {!loading && (
        <div>
          <Navbar />

          <div className='container'>
            <Routes />
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(
  null,
  null
)(App);
