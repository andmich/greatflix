import { createSelector } from 'reselect';
import { GreatflixState } from '../../types';

const getFilmModalStateSelector = (state: GreatflixState) => state.FilmModal;
export const selectFilmModalState = createSelector(
  getFilmModalStateSelector,
  (filmModalState) => filmModalState
);