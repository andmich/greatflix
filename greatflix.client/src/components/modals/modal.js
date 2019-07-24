import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './modal.css'

const Modal = (props) => {
  return (
    <div
      className={`modal ${props.isOpen ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{props.title}</p>
          <button className='delete' aria-label='close' onClick={() => props.onClose()}></button>
        </header>
        <section className='modal-card-body'>
          {props.children}
        </section>
        <footer className='modal-card-foot'>
          <button className='button' onClick={() => props.onClose()}>Close</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal
