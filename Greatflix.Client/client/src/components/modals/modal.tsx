import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './modal.css'
import { brotliDecompressSync } from 'zlib';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal : React.FC<ModalProps> = ({
  isOpen = false,
  title = '',
  onClose,
  children
}: ModalProps) => {
  const elements = document.getElementsByTagName('html');

  if (elements) {
    let html = elements[0];
    if (isOpen) {
      html.className = 'is-clipped'
    } else {
      html.className = html.className.replace('is-clipped', '');
    }
  }

  return (
    <div
      className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{title}</p>
          <button className='delete' aria-label='close' onClick={() => onClose()}></button>
        </header>
        <section className='modal-card-body'>
          {children}
        </section>
        <footer className='modal-card-foot'>
          <button className='button' onClick={() => onClose()}>Close</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal;
