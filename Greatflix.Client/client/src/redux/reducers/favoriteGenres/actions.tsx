import {
    ADD_FAVORITE_GENRE, 
    PUT_FAVORITE_GENRES,
    DELETE_FAVORITE_GENRE,
    FavoriteGenreModel,
} from './types';

export const addFavoriteGenre = (favoriteGenre: FavoriteGenreModel) => ({
    type: ADD_FAVORITE_GENRE,
    payload: favoriteGenre
});

export const putFavoriteGenres = (favoriteGenres: FavoriteGenreModel[]) => ({
    type: PUT_FAVORITE_GENRES,
    payload: favoriteGenres
});

export const deleteFavoriteGenre = (id: string | number) => ({
    type: DELETE_FAVORITE_GENRE,
    payload: {
        id: id
    }
});