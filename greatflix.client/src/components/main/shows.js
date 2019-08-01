import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import MovieSlider from '../movieslider/movieslider';

// globals
import { BasicMovieGenreList } from '../../globals';

const Shows = (props) => {
  const controller = new AbortController();

  useEffect(() => {
    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div>
      <h1>TVS</h1>
    </div>
  )
}

export default Shows;
