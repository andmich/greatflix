import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import Preloader from '../preloader/preloader';

const FavoriteFilmCard = (props) => {
  const [cardState, setCardState] = useState({isLoading: true, isFailed: false, data: {}});

  // used to cancel any fetches that are not complete
  const controller = new AbortController();

  const fetchFavoriteFilmDetails = async (filmId, filmType) => {
    let filmTypeEndpoint = filmType.includes('movie') ? 'movies' : 'tv';

    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/${filmTypeEndpoint}/${filmId}?appendToResponse=videos`,{
      signal: controller.signal
    });

    if (response.ok) {
      response
        .json()
        .then(data => {
          setCardState({
            isLoading: false,
            isFailed: false,
            data: data
          });
        });
    } else {
      console.log('error');
    }
  }

  useEffect(() => {
    if (cardState.isLoading && !cardState.isFailed) {
      fetchFavoriteFilmDetails(props.filmId, props.filmType);
    }

    return () => {
      // abort any fetches on cleanup
      controller.abort();
    }
  }, [cardState.isLoading]);

  return (
    <div>
      {cardState.isLoading && (
        <div style={{
            width: '185px',
            height: '250px'
          }}>
          <Preloader />
        </div>
      )}

      {!cardState.isLoading && (
        <div style={{
            marginLeft: '5px'
          }}>
          <img
            src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${cardState.data.details.poster_path}`}
            alt={cardState.data.details.title}/>
        </div>
      )}
    </div>
  )
}

export default FavoriteFilmCard;
