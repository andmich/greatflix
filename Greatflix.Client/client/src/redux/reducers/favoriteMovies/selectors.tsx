import { createSelector } from 'reselect';
import { GreatflixState } from '../../types';

const getFavoriteMoviesStateSelector = (store: GreatflixState) => store.FavoriteMovies;
export const selectGFavoriteMoviesState = createSelector(
    getFavoriteMoviesStateSelector,
    (favoriteMovies) => favoriteMovies
);

const getFavoriteMovieSelector = (store: GreatflixState, id: number | string) => {
    const favoriteMovieToReturn = store.FavoriteMovies
        .find(movie => movie.id === id);
    return favoriteMovieToReturn;
}
export const selectFavoriteMovie = createSelector(
    getFavoriteMoviesStateSelector,
    (favoriteMovie) => favoriteMovie
);