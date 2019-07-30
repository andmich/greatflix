import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useGlobalState } from '../../contexts/statecontext';
import { useAuth0 } from '../../auth-wrapper';

// components
import Modal from './modal';

const genres = [{
      id: 28,
      name: "Action",
    }, {
      id: 12,
      name: "Adventure"
    }, {
      id: 16,
      name: "Animation"
    }, {
      id: 35,
      name: "Comedy"
    }, {
      id: 80,
      name: "Crime"
    }, {
      id: 99,
      name: "Documentary"
    }, {
      id: 18,
      name: "Drama"
    }, {
      id: 10751,
      name: "Family"
    }, {
      id: 14,
      name: "Fantasy"
    }, {
      id: 36,
      name: "History"
    }, {
      id: 27,
      name: "Horror"
    }, {
      id: 10402,
      name: "Music"
    }, {
      id: 9648,
      name: "Mystery"
    }, {
      id: 10749,
      name: "Romance"
    }, {
      id: 878,
      name: "Science Fiction"
    }, {
      id: 10770,
      name: "TV Movie"
    }, {
      id: 53,
      name: "Thriller"
    }, {
      id: 10752,
      name: "War"
    }, {
      id: 37,
      name: "Western"
    }
  ]

const FavoriteGenresModal = (props) => {
  const { getTokenSilently } = useAuth0();
  const [{ favoriteGenres }, dispatch] = useGlobalState();

  const saveFavoriteGenre = async (genreId, source, name) => {
    const token = await getTokenSilently();

    var response = await fetch(`${process.env.REACT_APP_ENDPOINT}/favorites/genres`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        GenreId: genreId,
        Source: source
      })
    });

    if (response.ok) {
      // toaster
      dispatch({
        name: 'favoriteGenres',
        type: 'add',
        newFavoriteGenre: {
          id: genreId,
          name: name,
          source: source
        }
      })
    } else {
      console.log('error');
    }
  }

  function addFavoriteGenre(genreId, name) {
    // update database
    saveFavoriteGenre(genreId, 'tmdb', name);
  }
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title='Genres'>
      {genres.map((item, idx) => (
        <a
          key={idx}
          onClick={() => addFavoriteGenre(item.id, item.name)}>
          <div
            className='card'>
            <div className='card-content'>
              <p className='title' style={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                {item.name}
              </p>
            </div>
          </div>
        </a>
      ))}
    </Modal>
  )
}

export default FavoriteGenresModal;
