import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import MovieSlider from '../slider/movieslider';
import PreLoader from '../preloader/preloader';

// globals
import { BasicMovieGenreList } from '../../globals';

import './main.css';

const Movies = (props) => {
  const [popularMovies, setPopularMovies] = useState({ isLoading: true, isFailed: false, data: []});
  const [actionMovies, setActionMovies] = useState({ isLoading: true, isFailed: false, data: []});
  const [horrorMovies, setHorrorMovies] = useState({ isLoading: true, isFailed: false, data: []});
  const [comedyMovies, setComedyMovies] = useState({ isLoading: true, isFailed: false, data: []});

  const controller = new AbortController();

  async function fetchPopularMovies() {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/popular?page=1`);

    if (response.ok) {
      response
        .json()
        .then((data) => {
          setPopularMovies({ ...popularMovies, isLoading: false, data: data.results});
        })
        .catch(err => {
          console.log(err);
          setPopularMovies({ isLoading: false, isFailed: true, data: []});
        })
    }
    else {
      // error
      setPopularMovies({ isLoading: false, isFailed: true, data: []});
    }
  }

  async function fetchMoviesByGenre(genre, store, setFunction) {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/discover?page=1&genres=${BasicMovieGenreList[genre]}`, {
      signal: controller.signal
    });

    response
      .json()
      .then((data) => {
        setFunction({ ...store, isLoading: false, data: data.results});
      })
      .catch(err => {
        console.log(err)
        setFunction({ isLoading: false, isFailed: true, data: []});
      });
  }

  useEffect(() => {
    fetchPopularMovies();
    fetchMoviesByGenre('Action', actionMovies, setActionMovies);
    fetchMoviesByGenre('Horror', horrorMovies, setHorrorMovies);
    fetchMoviesByGenre('Comedy', comedyMovies, setComedyMovies);

    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div>
      <h1 className='title slider-title'>Action</h1>

      <PreLoader
        isLoading={actionMovies.isLoading}
        component={
          <MovieSlider
            data={actionMovies.data}/>
        }/>

      <h1 className='title slider-title'>Horror</h1>

      <PreLoader
        isLoading={horrorMovies.isLoading}
        component={
          <MovieSlider
            data={horrorMovies.data} />
        }/>

      <h1 className='title slider-title'>Comedy</h1>

      <PreLoader
        isLoading={comedyMovies.isLoading}
        component={
          <MovieSlider
            data={comedyMovies.data} />
        }/>
    </div>
  )
}

export default Movies;
