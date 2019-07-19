import React , { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// globals
import { MoviePictureHeights } from '../../globals';

// components
import MovieModal from '../modals/moviemodal';

// css
import './movieslider.css';

const MovieSlider = (props) => {
  const [modalState, setModalState] = useState({isOpen: false, movieId: null});

  function handleModalClose() {
    setModalState({isOpen: false, movieId: null})
  }

  return (
    <div>
      <div className='movie-slider-wrapper'>
        <h1 className='movie-slider-title'>{props.title}</h1>

        <div className='movie-slides'>
          {props.data.map((item, idx) => {
            return(
              <img
                className='movie-slide'
                onClick={() => setModalState({isOpen: true, movieId: item.id})}
                key={idx}
                src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`}
                alt={item.title}/>
            )
          })}
        </div>
        <MovieModal
          isOpen={modalState.isOpen}
          movieId={modalState.movieId}
          onClose={handleModalClose}/>
      </div>
    </div>
  );
}

export default MovieSlider;
