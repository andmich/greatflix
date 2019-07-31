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

// private components
import Settings from './privatecomponents/settings/settings';

// context
import { StateProvider, useGlobalState } from './contexts/statecontext';

// globals
import { TMDbGenres } from './globals';

const App = (props) => {
  const { getTokenSilently, loading } = useAuth0();
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

  const getFavoriteGenres = async () => {
    if (loading) {
      console.log('loading');
    } else {
      const token = await getTokenSilently();

      let response = await fetch(`${process.env.REACT_APP_ENDPOINT}/favorites/genres`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        response
          .json()
          .then(res => {
            let data = []

            res.forEach((item) => {
              data.push({
                id: item.genreId,
                name: TMDbGenres.filter(data => data.id === item.genreId)[0].name,
                source: 'tmdb'
              })
            })

            dispatch({
              name: 'favoriteGenres',
              type: 'put',
              newFavoriteGenres: data
            });
          });
      }
    }
  }

  const getFavoriteMovies = async () => {
    if (loading) {
      console.log('loading');
    } else {
      const token = await getTokenSilently();

      let response = await fetch(`${process.env.REACT_APP_ENDPOINT}/favorites/films?filmType=MOVIE`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        response
          .json()
          .then(data => {
            let favoriteMovies = []
            data.forEach((item) => {
              favoriteMovies.push({
                filmId: item.filmId,
                details: null
              })
            })
            dispatch({
              name: 'favoriteMovies',
              type: 'add',
              newFavoriteMovies: favoriteMovies
            });
          });
      } else {
        console.log('error');
      }
    }
  }

  useEffect(() => {
    getAccount();
    getFavoriteGenres();
    getFavoriteMovies();
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
