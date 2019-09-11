import React from 'react'
import PropTypes from 'prop-types'

import './preloader.css';

const PreLoader = (props) => {
  if (props.isLoading || !props.component) {
    return (
      <span className='loading'>
        <span className='loader'/>
      </span>
    );
  } else {
    return (
      props.component
    );
  }
}

export default PreLoader;
