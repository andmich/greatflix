import { 
  TMDbFilmDetails,
  TMDbMovie
} from '../../types';

export const TOGGLE_MOVIE_MODAL = 'TOGGLE_MOVIE_MODAL'
export const SET_MOVIE_MODAL_DETAILS = 'SET_MOVIE_MODAL_DETAILS';

export interface MovieModalState {
  isOpen?: boolean;
  isLoading?: boolean;
  movieId?: number;
  movieDetails?: TMDbFilmDetails<TMDbMovie>;
}

export interface ToggleMovieModalAction {
  type: typeof TOGGLE_MOVIE_MODAL,
  payload: {}
};

export interface SetMovieModalDetailsAction {
  type: typeof SET_MOVIE_MODAL_DETAILS,
  payload: {
    movieDetails: TMDbFilmDetails<TMDbMovie>
  }
};

export type MovieModalActionTypes = 
ToggleMovieModalAction |
SetMovieModalDetailsAction;