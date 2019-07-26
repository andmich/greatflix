import React from 'react'
import PropTypes from 'prop-types'

const FavoriteGenres = (props) => {
  return (
    <div>
      <h1 className='title'>Favorite Genres</h1>

      <hr />

      <div className='columns'>
        <div className='column is-one-fifth'>
          <div className='card'>
            <div className='card-content'>
              <p className='title' style={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <a><i className='fas fa-plus-circle fa-2x'></i></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoriteGenres;
