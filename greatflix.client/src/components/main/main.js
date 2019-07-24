import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import MovieSlider from '../movieslider/movieslider';

// globals
import { BasicMovieGenreList } from '../../globals';

const Main = (props) => {
  const [popularMovies, setPopularMovies] = useState({ isLoading: true, isFailed: false, data: []});
  const [actionMovies, setActionMovies] = useState({ isLoading: true, isFailed: false, data: []});
  const [horrorMovies, setHorrorMovies] = useState({ isLoading: true, isFailed: false, data: []});
  const [comedyMovies, setComedyMovies] = useState({ isLoading: true, isFailed: false, data: []});

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
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/discover?page=1&genres=${BasicMovieGenreList[genre]}`);

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
  }, []);

  return (
    <div>
      <MovieSlider
        title='Action'
        data={actionMovies.data} />

      <MovieSlider
        title='Horror'
        data={horrorMovies.data} />

      <MovieSlider
        title='Comedy'
        data={comedyMovies.data} />
    </div>
  )
}

export default Main;
