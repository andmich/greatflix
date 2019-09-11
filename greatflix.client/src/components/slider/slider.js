import React from 'react'
import PropTypes from 'prop-types'

// css
import './slider.css';

const Slider = (props) => {
  // unique id for slider
  const uniqueId = (Math.random() * 1000).toFixed(0);

  function navigateLeft(event) {
    var elWidth = document.getElementsByClassName('slide')[0].offsetWidth;
    var elMargin = parseInt(window.getComputedStyle(document.getElementsByClassName('slide')[0]).marginRight.replace('px', ''));
    let el = document.getElementById(`slides-${uniqueId}`);
    el.scrollLeft = el.scrollLeft - elWidth + elMargin;
  }

  function navigateRight(event) {
    var elWidth = document.getElementsByClassName('slide')[0].offsetWidth;
    var elMargin = parseInt(window.getComputedStyle(document.getElementsByClassName('slide')[0]).marginRight.replace('px', ''));
    let el = document.getElementById(`slides-${uniqueId}`);
    el.scrollLeft = el.scrollLeft + elWidth + elMargin;
  }

  return (
    <div className='slider-container'>
      <div className='slider-wrapper'>
        <a
          className='slider-go-button slider-go-left button is-rounded'
          onClick={navigateLeft}>
          <i className='fas fa-less-than'></i>
        </a>
        <div
          id={`slides-${uniqueId}`}
          className='slides'>
          {React.Children.map(props.children, child => (
            React.cloneElement(child, {
              className: 'slide'
            })
          ))}
        </div>
        <a
          className='slider-go-button slider-go-right button is-rounded'
          onClick={navigateRight}>
          <i className='fas fa-greater-than'></i>
        </a>
      </div>
    </div>
  )
}

export default Slider;
