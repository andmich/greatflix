import {
  TOGGLE_FILM_MODAL,
  SET_FILM_MODAL_DETAILS,
  ToggleFilmModalAction,
  SetFilmModalDetailsAction,
  FilmDetailProps,
  
} from './types';
import { TMDbFilmDetails, TMDbMovie, TMDbTVShow, GetAppendedResponse, TMDbVideo } from '../../types';

export const toggleFilmModal = () : ToggleFilmModalAction => {
  console.log('hi')
  return ({
    type: TOGGLE_FILM_MODAL,
    payload: {}
  });
}

export const setFilmModalDetails = (filmDetails: GetAppendedResponse<TMDbMovie | TMDbTVShow, TMDbVideo>) : SetFilmModalDetailsAction => ({
  type: SET_FILM_MODAL_DETAILS,
  payload: {
    filmDetails: filmDetails.result as FilmDetailProps,
    videos: filmDetails.appendedResults
  }
}); 