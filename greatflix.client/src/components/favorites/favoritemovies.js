import React from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../contexts/statecontext';

// components
import FavoriteFilmCard from '../cards/favoritefilmcard';

const FavoriteMovies = (props) => {
  const [{favoriteMovies}, dispatch] = useGlobalState();

  return (
    <div style={{
        marginBottom: '20px'
      }}>
      <h1 className='title'>Favorite Movies</h1>

      <hr />

      <div style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto'
        }}>
        {favoriteMovies.length > 0 ?
          favoriteMovies.map((item, idx) => (
            <FavoriteFilmCard
              key={idx}
              filmId={item.filmId}
              filmType='movies'/>
          )) :
          <div>
            <h4><i>No Favorites...</i></h4>
          </div>
        }
      </div>
    </div>
  )
}

export default FavoriteMovies;
