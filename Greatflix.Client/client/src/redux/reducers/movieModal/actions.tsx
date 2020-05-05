import {
  TOGGLE_MOVIE_MODAL,
  SET_MOVIE_MODAL_DETAILS,
  ToggleMovieModalAction,
  SetMovieModalDetailsAction,
} from './types';
import { TMDbFilmDetails, TMDbMovie } from '../../types';


export const toggleMovieModal = () : ToggleMovieModalAction => ({
  type: TOGGLE_MOVIE_MODAL,
  payload: {}
});

export const setMovieModalDetails = (movieDetails: TMDbFilmDetails<TMDbMovie>) : SetMovieModalDetailsAction => {
  return {
    type: SET_MOVIE_MODAL_DETAILS,
    payload: {
      movieDetails: movieDetails
    }
  }
}