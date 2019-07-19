import React from 'react'
import PropTypes from 'prop-types'

// globals
import { MoviePictureHeights } from '../../globals';

// css
import './movieslider.css';

const MovieSlider = (props) => {
  console.log(props)
  return (
    <div>
      <div className='movie-slider-wrapper'>
        <h1 className='movie-slider-title'>{props.title}</h1>

        <div className='movie-slides'>
          {props.data.map((item, idx) => {
            console.log(item)
            console.log(`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185/${item.poster_path}`)
            return(
              <img
                className='movie-slide'
                key={idx}
                src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`}
                alt={item.title}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieSlider;
