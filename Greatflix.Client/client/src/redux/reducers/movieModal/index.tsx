import {
  TOGGLE_MOVIE_MODAL,
  SET_MOVIE_MODAL_DETAILS,
  MovieModalState,
  MovieModalActionTypes
} from './types';

const initialState: MovieModalState = {
  isOpen: false,
  isLoading: true,
  movieId: undefined,
  movieDetails: undefined
}


export default (state: MovieModalState = initialState, action: MovieModalActionTypes) => {
  switch (action.type) {
    case TOGGLE_MOVIE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen,
        isLoading: state.isOpen && state.isLoading,
        movieDetails: state.isOpen ? null : state.movieDetails
      };
    case SET_MOVIE_MODAL_DETAILS:
      return {
        ...state,
        isOpen: true,
        isLoading: false,
        movieDetails: action.payload.movieDetails
      };
    default:
      return state;
  }
}