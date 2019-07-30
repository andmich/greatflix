import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../contexts/statecontext';
import { useAuth0 } from '../../auth-wrapper';

// components
import FavoriteGenresModal from '../modals/favoritegenresmodal';

// globals
import { TMDbGenres } from '../../globals';

const FavoriteGenres = (props) => {
  const [modalState, setModalState] = useState({isOpen: false});
  const [{favoriteGenres}, dispatch] = useGlobalState();
  const { getTokenSilently } = useAuth0();

  function handleModalClose() {
    setModalState({isOpen: false});
  }

  const getFavoriteGenres = async () => {
    const token = await getTokenSilently();

    let response = await fetch(`${process.env.REACT_APP_ENDPOINT}/favorites/genres`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      response
        .json()
        .then(res => {
          let data = []

          res.forEach((item) => {
            data.push({
              id: item.genreId,
              name: TMDbGenres.filter(data => data.id === item.genreId)[0].name,
              source: 'tmdb'
            })
          })

          dispatch({
            name: 'favoriteGenres',
            type: 'put',
            newFavoriteGenres: data
          });
        });
    }
  }

  useEffect(() => {
    getFavoriteGenres();
  }, [])

  return (
    <div>
      <h1 className='title'>Favorite Genres</h1>

      <hr />

      <div className='columns'>
        {favoriteGenres.map((item, idx) => (
          <div className='column is-one-fifth'>
            <div className='card'>
              <div className='card-content'>
                <p
                  className='title'
                  style={{
                      height: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                  <span className='subtitle'>
                    {item.name}
                  </span>
                </p>
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
