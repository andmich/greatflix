import React, { useState } from 'react'
import PropTypes from 'prop-types'

// components
import Slider from '../slider/slider';
import MovieModal from '../modals/moviemodal';

const TVShowSlider = (props) => {
  const [modalState, setModalState] = useState({isOpen: false, movieId: null});

  function handleModalClose(cb) {
    setModalState({isOpen: false, tvshowId: null})
  }

  return (
    <Slider>
      {props.data.map((item, idx) => {
        return(
          <img
            className='slide'
            onClick={() => {
              // must enable scrolling after click
              setModalState({isOpen: true, tvshowId: item.id})
            }}
            key={idx}
            src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`}
            alt={item.title}/>
        )
      })}
    </Slider>
  )
}

export default TVShowSlider;

/*
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
      isLoading={horrorMovies.isLoading}
      component={
        <MovieSlider
          data={comedyMovies.data} />
      }/>
  </div>
)
*/
