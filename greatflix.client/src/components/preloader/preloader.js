import React from 'react'
import PropTypes from 'prop-types'

import './preloader.css';

const PreLoader = (props) => {
  return (
    <span className='loading'>
      <span className='loader'/>
    </span>
  )
}

export default PreLoader;
