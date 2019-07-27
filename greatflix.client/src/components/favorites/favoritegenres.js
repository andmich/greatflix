import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../contexts/statecontext';

// components
import FavoriteGenresModal from '../modals/favoritegenresmodal';

const FavoriteGenres = (props) => {
  const [modalState, setModalState] = useState({isOpen: false});
  const [{favoriteGenres}, dispatch] = useGlobalState();

  function handleModalClose() {
    setModalState({isOpen: false});
  }

  return (
    <div>
      <h1 className='title'>Favorite Genres</h1>

      <hr />

      <div className='columns'>
        {favoriteGenres.map((item, idx) => (
          <div className='column is-one-fifth'>
            <div className='card'>
              <div className='card-content'>
                hi
              </div>
            </div>
          </div>
        ))}

        <div className='column is-one-fifth'>
          <a
            onClick={() => setModalState({isOpen: true})}>
            <div className='card'>
              <div className='card-content'>
                <p className='title' style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                  <i className='fas fa-plus-circle fa-2x'></i>
                  <br />
                  <span className='subtitle'>
                    Add a Favorite!
                  </span>
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <FavoriteGenresModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}/>
    </div>
  )
}

export default FavoriteGenres;
