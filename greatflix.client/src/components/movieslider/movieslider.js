import React , { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// components
import MovieModal from '../modals/moviemodal';

// css
import './movieslider.css';

const MovieSlider = (props) => {
  const [modalState, setModalState] = useState({isOpen: false, movieId: null});
  const currentPos = useRef();

  function handleModalClose() {
    setModalState({isOpen: false, movieId: null})
  }

  function onWheel(event) {
    event.currentTarget.scrollLeft = event.currentTarget.scrollLeft + (event.deltaY * .3);
  }

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function disableScroll() {
    console.log('disabling')
    if (window.addEventListener)
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, {passive: false});
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
  }

  function enableScroll() {
    console.log('enabling')
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
  }

  return (
    <div>
      <div className='movie-slider-wrapper'>
        <h1 className='movie-slider-title'>{props.title}</h1>

        <div
          className='movie-slides'
          onWheel={onWheel}
          onMouseEnter={disableScroll}
          onMouseLeave={enableScroll}>
          {props.data.map((item, idx) => {
            return(
              <img
                className='movie-slide'
                onClick={() => {
                  // must enable scrolling after click 
                  enableScroll();
                  setModalState({isOpen: true, movieId: item.id})
                }}
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
