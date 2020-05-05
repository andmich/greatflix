import { createSelector } from 'reselect';
import { GreatflixState } from '../../types';

const getMovieModalStateSelector = (store: GreatflixState) => store.MovieModal;
export const selectMovieModalState = createSelector(
  getMovieModalStateSelector,
  (movieModalState) => movieModalState
);