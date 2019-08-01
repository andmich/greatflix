import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';
import { useAuth0 } from '../../auth-wrapper';
import { toast } from 'bulma-toast';
import { useGlobalState, StateConsumer } from '../../contexts/statecontext';

import Preloader from '../preloader/preloader';

// css
import './moviemodal.css';

const MovieModal = (props) => {
  const [modalData, setModalData] = useState({ isLoading: true, isFailed: false, data: {
    details: {
      title: ''
    },
    videos: []
  }});

  const { getTokenSilently } = useAuth0();

  const [{ favoriteFilms }, dispatch] = useGlobalState();

  async function fetchFilm(movieId) {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/${movieId}?appendToResponse=videos`);

    if (response.ok) {
      response
        .json()
        .then((data) => {
          setModalData({ isLoading: false, isFailed: false, data: {
            details: data.details,
            videos: data.videos.results
          }});
        })
        .catch(err => {
          setModalData({ isLoading: false, isFailed: true, data: {}});
        });
    } else {
      setModalData({ isLoading: false, isFailed: true, data: {}});
    }
  }

  async function addFavoriteFilm(filmId) {
    const token = await getTokenSilently();

    let body = {
      FilmId: filmId,
      FilmType: 'MOVIE'
    }

    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/favorites/films`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      dispatch({
        name: 'favoriteMovies',
        type: 'add',
        newFavoriteMovie: {
          filmId: filmId
        }
      });

      toast({
        message: `Movie added to favorites`,
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut'}
      });
    } else {
      toast({
        message: `Could not add movie to favorites`,
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut'}
      });
    }
  }

  function handleModalClose() {
    // reset data
    setModalData({ isLoading: true, isFailed: false, data: {
      title: ''
    }});

    // close modal
    props.onClose();
  }

  function handleAddToFavorites(filmId) {
    addFavoriteFilm(filmId);
  }

  useEffect(() => {
    if (props.isOpen && (modalData.isLoading && !modalData.isFailed)) {
      // get data
      fetchFilm(props.movieId);
    }
  })

  return(
    <Modal
      isOpen={props.isOpen}
      onClose={handleModalClose}
      title={modalData.isLoading ? '' : modalData.data.details.title}>
      <StateConsumer>
        {([{favoriteMovies}]) => (
          modalData.isLoading ?
          <Preloader /> :
          <div className='movie-modal-content'>
            <div className='columns'>
              <div className='column is-one-third'>
                <img
                  src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${modalData.data.details.poster_path}`}
                  alt={modalData.data.details.title}
                  style={{display: 'block', margin: 'auto'}}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5px'}}>
                  {favoriteMovies.filter(movie => movie.filmId === props.movieId).length > 0 ?
                    <a
                      className='button is-danger'
                      onClick={() => handleAddToFavorites(props.movieId)}>
                      Remove from Favorites
                    </a> :
                    <a
                      className='button is-success'
                      onClick={() => handleAddToFavorites(props.movieId)}>
                      Add to Favorites
                    </a>
                  }
                </div>

                <hr />

                <table className='table'>
                  <tbody>
                    <tr>
                      <td><strong>Status</strong></td>
                      <td><span className='tag is-success'>{modalData.data.details.status}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Budget</strong></td>
                      <td>${modalData.data.details.budget.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td><strong>Revenue</strong></td>
                      <td>${modalData.data.details.revenue.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td><strong>Profit</strong></td>
                      <td>
                          {modalData.data.details.revenue - modalData.data.details.budget < 0 ?
                            <span style={{color: 'red'}}>{`-$${(Math.abs(modalData.data.details.revenue - modalData.data.details.budget)).toLocaleString()}`}</span> :
                            <span style={{color: 'green'}}>{`$${(Math.abs(modalData.data.details.revenue - modalData.data.details.budget)).toLocaleString()}`}</span>
                          }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='column'>
                <p>
                  {modalData.data.details.overview}
                </p>

                {modalData.data.videos.length > 0 ?
                  <div className='movie-video-container'>
                    <iframe
                      title={modalData.data.details.title}
                      width='100%'
                      height='0'
                      src={`https://www.youtube.com/embed/${modalData.data.videos[0].key}`}
                      frameBorder='0'
                      allowFullScreen
                      className='movie-video'>
                    </iframe>
                  </div> :
                  ''
                }
              </div>
            </div>
            <hr />
            <div>
              <h5>Reviews</h5>
              <hr />
              <div>

              </div>

              <textarea className='textarea' placeholder='If you want, leave a review!' rows='10'></textarea>
            </div>
          </div>
        )}
      </StateConsumer>
    </Modal>
  );
}

/*
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
          <div className='column is-one-third'>
            <img
              src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${modalData.data.details.poster_path}`}
              alt={modalData.data.details.title}
              style={{display: 'block', margin: 'auto'}}/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5px'}}>
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

            <hr />

            <table className='table'>
              <tbody>
                <tr>
                  <td><strong>Status</strong></td>
                  <td><span className='tag is-success'>{modalData.data.details.status}</span></td>
                </tr>
                <tr>
                  <td><strong>Budget</strong></td>
                  <td>${modalData.data.details.budget.toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Revenue</strong></td>
                  <td>${modalData.data.details.revenue.toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Profit</strong></td>
                  <td>
                      {modalData.data.details.revenue - modalData.data.details.budget < 0 ?
                        <span style={{color: 'red'}}>{`-$${(Math.abs(modalData.data.details.revenue - modalData.data.details.budget)).toLocaleString()}`}</span> :
                        <span style={{color: 'green'}}>{`$${(Math.abs(modalData.data.details.revenue - modalData.data.details.budget)).toLocaleString()}`}</span>
                      }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='column'>
            <div>
              <h1 className='movie-modal-title'>{modalData.data.details.title}</h1>
              <h5>Released on {new Date(modalData.data.details.release_date).toDateString()}</h5>
            </div>

            <hr />

            <p>
              {modalData.data.details.overview}
            </p>

            {modalData.data.videos.length > 0 ?
              <div className='movie-video-container'>
                <iframe
                  title={modalData.data.details.title}
                  width='100%'
                  height='0'
                  src={`https://www.youtube.com/embed/${modalData.data.videos[0].key}`}
                  frameBorder='0'
                  allowFullScreen
                  className='movie-video'>
                </iframe>
              </div> :
              ''
            }
          </div>
        </div>
        <hr />
        <div>
          <h5>Comments</h5>
        </div>
      </div>
    }
  </Modal>
)
*/

// default props
MovieModal.defaultProps = {
  title: ''
}

export default MovieModal;
