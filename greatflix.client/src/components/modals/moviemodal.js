import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

import Preloader from '../preloader/preloader';

// css
import './moviemodal.css';

const MovieModal = (props) => {
  const customModalStyles = {
    modal: {
      width: '90%',
    },
    closeButton: {
      cursor: 'pointer'
    }
  }
  const [modalData, setModalData] = useState({ isLoading: true, isFailed: false, data: {
    title: ''
  }});

  async function fetchMovie(movieId) {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/${movieId}`);

    if (response.ok) {
      response
        .json()
        .then((data) => {
          setModalData({ isLoading: false, isFailed: false, data: data});
        })
        .catch(err => {
          setModalData({ isLoading: false, isFailed: true, data: {}});
        });
    } else {
      setModalData({ isLoading: false, isFailed: true, data: {}});
    }
  }

  function handleModalClose() {
    // reset data
    setModalData({isOpen: false, isLoading: true, isFailed: false, data: {
      title: ''
    }});

    // close modal
    props.onClose();
  }

  useEffect(() => {
    console.log(props.movieId)
    if (props.isOpen && (modalData.isLoading && !modalData.isFailed)) {
      console.log('fetching')
      // get data
      fetchMovie(props.movieId);
    }
  })

  return (
    <Modal
      open={props.isOpen}
      onClose={handleModalClose}
      styles={{
        modal: customModalStyles.modal,
        closeButton: customModalStyles.closeButton
      }}>
      {modalData.isLoading ?
        <Preloader />:
        <div className='movie-modal-content'>
          <div className='columns'>
            <div className='column is-one-quarter' >
              <img
                src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${modalData.data.poster_path}`}
                alt={modalData.data.title}/>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <a href='#'>
                  <span className='icon is-medium'>
                    <span className='fa-stack'>
                      <i className='fas fa-circle fa-stack-2x'></i>
                      <i className='fas fa-thumbs-up fa-stack-1x fa-inverse'></i>
                    </span>
                  </span>
                </a>
                &nbsp;&nbsp;
                <a href='#'>
                  <span className='icon is-medium'>
                    <span className='fa-stack'>
                      <i className='fas fa-circle fa-stack-2x'></i>
                      <i className='fas fa-thumbs-down fa-stack-1x fa-inverse fa-flip-horizontal'></i>
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div className='column'>
              <div>
                <h1 className='movie-modal-title'>{modalData.data.title}</h1>
                <h5>Released on {new Date(modalData.data.release_date).toDateString()}</h5>
              </div>

              <hr />

              <p>
                {modalData.data.overview}
              </p>
            </div>
          </div>
        </div>
      }
    </Modal>
  )
}

// default props
MovieModal.defaultProps = {
  title: ''
}

export default MovieModal;
