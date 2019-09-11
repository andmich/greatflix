import React , { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// components
import MovieModal from '../modals/moviemodal';
import Slider from './slider';

const MovieSlider = (props) => {
  // unique id for slider
  const uniqueId = (Math.random() * 1000).toFixed(0);

  const [modalState, setModalState] = useState({isOpen: false, movieId: null});

  function handleModalClose(cb) {
    setModalState({isOpen: false, movieId: null})
  }


  return (
    <div>
      <Slider>
        {props.data.map((item, idx) => {
          return(
            <img
              onClick={() => {
                // must enable scrolling after click
                setModalState({isOpen: true, movieId: item.id})
              }}
              key={idx}
              src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`}
              alt={item.title}/>
          )
        })}
      </Slider>

      <MovieModal
        isOpen={modalState.isOpen}
        movieId={modalState.movieId}
        onClose={() => handleModalClose()}/>
    </div>
  );
}

export default MovieSlider;
