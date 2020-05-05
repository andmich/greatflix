import {
    ADD_FAVORITE_MOVIE,
    PUT_FAVORITE_MOVIES,
    DELETE_FAVORITE_MOVIE,
    FavoriteMovieModel,
    AddFavoriteMovieAction,
    PutFavoriteMovieAction,
    DeleteFavoriteMovieAction
} from './types';

export const addFavoriteMovie = (favoriteMovie: FavoriteMovieModel) : AddFavoriteMovieAction => ({
    type: ADD_FAVORITE_MOVIE,
    payload: favoriteMovie
});

export const putFavoriteMovies = (favoriteMovies: FavoriteMovieModel[]) : PutFavoriteMovieAction => ({
    type: PUT_FAVORITE_MOVIES,
    payload: favoriteMovies
});

export const deleteFavoriteMovie = (id: string | number) : DeleteFavoriteMovieAction => ({
    type: DELETE_FAVORITE_MOVIE,
    payload: {
        id
    }
});