import { createSelector } from 'reselect';
import { GreatflixState } from '../../types';

const getFavoriteGenresStateSelector = (store: GreatflixState) => store.FavoriteGenres;
export const selectFavoriteGenresState = createSelector(
    getFavoriteGenresStateSelector,
    (favoriteGenres) => favoriteGenres
)

const getFavoriteGenreSelector = (store: GreatflixState, id: number | string) => {
    const favoriteGenreToReturn = store.FavoriteGenres
        .find(genre => genre.id === id);
    return favoriteGenreToReturn;
}
export const selectFavoriteGenre = createSelector(
    getFavoriteGenreSelector,
    (favoriteGenre) => favoriteGenre
);

