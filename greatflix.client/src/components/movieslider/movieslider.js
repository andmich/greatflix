import React from 'react'
import PropTypes from 'prop-types'

// css
import './movieslider.css';

const MovieSlider = (props) => {
  return (
    <div>
      <div class='movie-slider-wrapper'>
        <h1 className='movie-slider-title'>{props.title}</h1>

        <div className='columns'>
          <div class='column is-one-fifth'>
            <div className='card'>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
                </figure>
              </div>
            </div>
          </div>
          <div class='column is-one-fifth'>
            <div className='card'>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
                </figure>
              </div>
            </div>
          </div>
          <div class='column is-one-fifth'>
            <div className='card'>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
                </figure>
              </div>
            </div>
          </div>
          <div class='column is-one-fifth'>
            <div className='card'>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
                </figure>
              </div>
            </div>
          </div>
          <div class='column is-one-fifth'>
            <div className='card'>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSlider;
