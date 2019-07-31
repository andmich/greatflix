import React from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../contexts/statecontext';

const FavoriteMovies = (props) => {
  const [{favoriteMovies}, dispatch] = useGlobalState();

  const fetchMovieDetails = async (movieId) => {

  }

  return (
    <div style={{
        marginBottom: '20px'
      }}>
      <h1 className='title'>Favorite Movies</h1>

      <hr />

      {favoriteMovies.length > 0 ?
        <div className='columns'>
          {favoriteMovies.map((item, idx) => (
            <div className='column is-one-fifth'>
              <div
                className='card'
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path})`
                }}>
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
                      {item.title}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> :
        <div>
          <h4><i>No Favorites...</i></h4>
        </div>
      }
    </div>
  )
}

export default FavoriteMovies;
