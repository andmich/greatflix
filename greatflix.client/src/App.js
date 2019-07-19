import React, { useState, useEffect } from 'react';
import logo from './logo.svg';

// css
import './App.css';
import 'bulma/css/bulma.css'

// compnents
import Navbar from './components/navbar/navbar';
import MovieSlider from './components/movieslider/movieslider';

// import globals
import { BasicMovieGenreList } from './globals';

const App = (props) => {
  const [actionMovies, setActionMovies] = useState({ isLoading: true, isFailed: false, data: []});
  const [horrorMovies, setHorrorMovies] = useState({ isLoading: true, isFailed: false, data: []});

  async function fetchActionMovies() {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/discover?page=1&genres=${BasicMovieGenreList['Action']}`);

    response
      .json()
      .then((data) => {
        setActionMovies({ ...actionMovies, isLoading: false, data: data.results});
      })
      .catch(err => {
        console.log(err)
        setActionMovies({ isLoading: false, isFailed: true, data: []});
      });
  }

  async function fetchHorrorMovies() {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/discover?page=1&genres=${BasicMovieGenreList['Horror']}`);

    response
      .json()
      .then((data) => {
        setHorrorMovies({ ...horrorMovies, isLoading: false, data: data.results});
      })
      .catch(err => {
        console.log(err)
        setHorrorMovies({ isLoading: false, isFailed: true, data: []});
      });
  }

  useEffect(() => {
    fetchActionMovies();
    fetchHorrorMovies();
  }, []);

  return(
    <div className="App">
      <Navbar />

      <div>
        {console.log(actionMovies, horrorMovies)}
      </div>

      <MovieSlider
        title='Action'
        data={actionMovies.data}
        />

      <MovieSlider
        title='Horror'
        data={horrorMovies.data}
        />
    </div>
  );
}

export default App;
