import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import TVShowSlider from '../slider/movieslider';
import PreLoader from '../preloader/preloader';

// globals
import { BasicTVShowGenreList } from '../../globals';

const Shows = (props) => {
  const [actionShows, setActionShows] = useState({ isLoading: true, isFailed: false, data: []});
  const [sciFiFantasyShows, setSciFiFantasyShows] = useState({ isLoading: true, isFailed: false, data: []});
  const [comedyShows, setComedyShows] = useState({ isLoading: true, isFailed: false, data: []});

  const controller = new AbortController();

  async function fetchTVShowsByGenre(genre, store, setFunction) {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/tvshows/discover?page=1&genres=${BasicTVShowGenreList[genre]}`, {
      signal: controller.signal
    });

    response
      .json()
      .then((data) => {
        setFunction({ ...store, isLoading: false, data: data.results});
      })
      .catch(err => {
        console.log(err)
        setFunction({ isLoading: false, isFailed: true, data: []});
      });
  }

  useEffect(() => {
    fetchTVShowsByGenre('Action', actionShows, setActionShows);
    fetchTVShowsByGenre('Sci-Fi & Fantasy', sciFiFantasyShows, setSciFiFantasyShows);
    fetchTVShowsByGenre('Comedy', comedyShows, setComedyShows);

    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div>
      <h1 className='title slider-title'>Action</h1>

      <PreLoader
        isLoading={actionShows.isLoading}
        component={
          <TVShowSlider
            data={actionShows.data}/>
        }/>

      <h1 className='title slider-title'>Sci-Fi & Fantasy</h1>

      <PreLoader
        isLoading={sciFiFantasyShows.isLoading}
        component={
          <TVShowSlider
            data={sciFiFantasyShows.data} />
        }/>

      <h1 className='title slider-title'>Comedy</h1>

      <PreLoader
        isLoading={comedyShows.isLoading}
        component={
          <TVShowSlider
            data={comedyShows.data} />
        }/>
    </div>
  )
}

export default Shows;
