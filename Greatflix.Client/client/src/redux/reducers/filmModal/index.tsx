import {
  TOGGLE_FILM_MODAL,
  SET_FILM_MODAL_DETAILS,
  FilmModalState,
  FilmModalActionTypes
} from './types';
import { TMDbMediaType } from '../../../globals';

const initialState: FilmModalState = {
  isOpen: false,
  filmId: undefined,
  isLoading: true,
  mediaType: TMDbMediaType.movie,
  filmDetails: undefined,
  videos: []
}

export default (state: FilmModalState = initialState, action: FilmModalActionTypes) => {
  switch (action.type) {
    case TOGGLE_FILM_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen,
        isLoading: state.isOpen && state.isLoading,
        filmDetails: !state.isOpen ? state.filmDetails : null,
        videos: !state.isOpen ? state.videos : null
      };
    case SET_FILM_MODAL_DETAILS:
      return {
        ...state,
        isOpen: true,
        isLoading: false,
        filmDetails: action.payload.filmDetails,
        videos: action.payload.videos
      };
    default: 
      return state;
  }
}