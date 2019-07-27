import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useAuth0 } from './auth-wrapper';

// css
import './App.css';
import 'bulma/css/bulma.css'

// compnents
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';
import Movie from './components/movie/movie';
import Settings from './components/settings/settings';

// context
import { StateProvider, useGlobalState } from './contexts/statecontext';

const App = (props) => {
  const { getTokenSilently, loading, user } = useAuth0();
  const [{ account }, dispatch] = useGlobalState();

  // we need to see if the logged in user has an account
  const getAccount = async () => {
    if (loading) {
      console.log('user loading');
    } else {
      try {
        const token = await getTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/accounts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          response
            .json()
            .then(data => {
              dispatch({
                name: 'account',
                type: 'update',
                account: {
                  id: data.id,
                  userId: data.userId
                }
              });
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          if (response.status === 404) {
            // attempt to add account
            const post_response = await fetch(`${process.env.REACT_APP_ENDPOINT}/accounts`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            if (!post_response.ok) {
              console.log(post_response);
            }
          }
        }
      } catch (error) {
        console.log(`Error fetching token ${error}`);
      }
    }
  }

  useEffect(() => {
    getAccount();
  }, [loading])

  return(
    <div className="App">
      <Router>
        <Navbar />

        <Route
          path='/'
          exact
          component={Main}/>

        <Route
          path='/movie/:movieId'
          exact
          component={Movie}/>

        <Route
          path='/settings'
          exact
          component={Settings}/>
      </Router>
    </div>
  );
}

export default App;
