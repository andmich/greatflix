import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from './auth-wrapper';

// css
import './App.css';
import 'bulma/css/bulma.css'

// compnents
import Navbar from './components/navbar/navbar';
import Movies from './components/main/movies';
import Shows from './components/main/shows';
import Preloader from './components/preloader/preloader';

// private components
import Settings from './privatecomponents/settings/settings';

// context
import { useGlobalState } from './contexts/statecontext';

// globals
import { TMDbMovieGenres } from './globals';

const App = (props) => {
  const { getTokenSilently, loading, isAuthenticated } = useAuth0();
  const [{ account }, dispatch] = useGlobalState();


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
                id: item.genre_id,
                name: TMDbMovieGenres.filter(data => data.id === item.genre_id)[0].name,
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
                filmId: item.film_id
              })
            });

            dispatch({
              name: 'favoriteMovies',
              type: 'put',
              newFavoriteMovies: favoriteMovies
            });
          });
      } else {
        console.log('error');
      }
    }
  }

  useEffect(() => {
    getFavoriteGenres();
    getFavoriteMovies();
  }, [loading])

  return(
    <div className="App">
      {loading && (
        <Preloader />
      )}

      {!loading && (
        <div>
          <Navbar />

          <Route
            path='/movies'
            exact
            component={Movies}/>

          <Route
            path='/shows'
            exact
            component={Shows}/>

          <Route
            path='/settings'
            exact
            component={Settings}/>

          {props.match.path === '/'  && (
            <Redirect
              to={{
                pathname: '/movies'
              }}/>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
