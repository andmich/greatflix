import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
  function addFavoriteGenre(genreId) {
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title='Genres'>
      {genres.map((item, idx) => (
        <a
          onClick={() => addFavoriteGenre(item.id)}>
          <div
            key={idx}
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
