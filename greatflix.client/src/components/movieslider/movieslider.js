import React , { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// components
import MovieModal from '../modals/moviemodal';

// css
import './movieslider.css';

const MovieSlider = (props) => {
  const [modalState, setModalState] = useState({isOpen: false, movieId: null});
  const currentPos = useRef();

  function handleModalClose(cb) {
    setModalState({isOpen: false, movieId: null})
  }

  // function onWheel(event) {
  //   event.currentTarget.scrollLeft = event.currentTarget.scrollLeft + (event.deltaY * .3);
  // }
  //
  // function preventDefault(e) {
  //   e = e || window.event;
  //   if (e.preventDefault)
  //     e.preventDefault();
  //   e.returnValue = false;
  // }
  //
  // function disableScroll() {
  //   console.log('disabling')
  //   if (window.addEventListener)
  //     window.addEventListener('DOMMouseScroll', preventDefault, false);
  //   document.addEventListener('wheel', preventDefault, {passive: false});
  //   window.onwheel = preventDefault; // modern standard
  //   window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  //   window.ontouchmove  = preventDefault; // mobile
  // }
  //
  // function enableScroll() {
  //   console.log('enabling')
  //   if (window.removeEventListener)
  //       window.removeEventListener('DOMMouseScroll', preventDefault, false);
  //   document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
  //   window.onmousewheel = document.onmousewheel = null;
  //   window.onwheel = null;
  //   window.ontouchmove = null;
  // }

  function navigateLeft(event) {
    event.currentTarget.scrollLeft = event.currentTarget.scrollLeft + 100;
  }

  function navigateRight(event) {
    event.currentTarget.scrollLeft = event.currentTarget.scrollLeft - 100;
  }

  return (
    <div>
      <div className='movie-slider-wrapper'>
        <h1 className='movie-slider-title'>{props.title}</h1>

        <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center'
          }}>
          <a
            className='movie-slider-go-button movie-slider-go-left button is-rounded'
            onClick={() => navigateLeft()}>
            <i className='fas fa-less-than'></i>
          </a>
          <div
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
            onClick={() => navigateRight()}>
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
