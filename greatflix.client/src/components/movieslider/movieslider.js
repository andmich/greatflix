import React , { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// components
import MovieModal from '../modals/moviemodal';

// css
import './movieslider.css';

const MovieSlider = (props) => {
  // unique id for slider
  const uniqueId = (Math.random() * 1000).toFixed(0);

  // get width of movie slide
  let movieSlides = document.getElementsByClassName('movie-slide')

  const [modalState, setModalState] = useState({isOpen: false, movieId: null});
  const currentPos = useRef();

  function handleModalClose(cb) {
    setModalState({isOpen: false, movieId: null})
  }

  function navigateLeft(event) {
    var elWidth = document.getElementsByClassName('movie-slide')[0].offsetWidth;
    var elMargin = parseInt(window.getComputedStyle(document.getElementsByClassName('movie-slide')[0]).marginRight.replace('px', ''));
    let el = document.getElementById(`movie-slides-${uniqueId}`);
    el.scrollLeft = el.scrollLeft - elWidth + elMargin;

  }

  function navigateRight(event) {
    var elWidth = document.getElementsByClassName('movie-slide')[0].offsetWidth;
    var elMargin = parseInt(window.getComputedStyle(document.getElementsByClassName('movie-slide')[0]).marginRight.replace('px', ''));
    let el = document.getElementById(`movie-slides-${uniqueId}`);
    el.scrollLeft = el.scrollLeft + elWidth + elMargin;
  }

  return (
    <div>
      <div className='movie-slider-container'>
        <h1 className='title'>{props.title}</h1>

        <div className='movie-slider-wrapper'>
          <a
            className='movie-slider-go-button movie-slider-go-left button is-rounded'
            onClick={navigateLeft}>
            <i className='fas fa-less-than'></i>
          </a>
          <div
            id={`movie-slides-${uniqueId}`}
            className='movie-slides'>
            {props.data.map((item, idx) => {
              return(
                <img
                  className='movie-slide'
                  onClick={() => {
                    // must enable scrolling after click
                    setModalState({isOpen: true, movieId: item.id})
                  }}
                  key={idx}
                  src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`}
                  alt={item.title}/>
              )
            })}
          </div>
          <a
            className='movie-slider-go-button movie-slider-go-right button is-rounded'
            onClick={navigateRight}>
            <i className='fas fa-greater-than'></i>
          </a>
        </div>

        <MovieModal
          isOpen={modalState.isOpen}
          movieId={modalState.movieId}
          onClose={() => handleModalClose()}/>
      </div>
    </div>
  );
}

export default MovieSlider;
