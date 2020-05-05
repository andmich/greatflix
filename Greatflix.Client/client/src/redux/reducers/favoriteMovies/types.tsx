export const ADD_FAVORITE_MOVIE = 'ADD_FAVORITE_MOVIE';
export const PUT_FAVORITE_MOVIES = 'PUT_FAVORITE_MOVIES';
export const DELETE_FAVORITE_MOVIE = 'DELETE_FAVORITE_MOVIE';

export interface FavoriteMovieModel {
    id: string | number;
    userId: string | number;
    filmId: number;
    filmTypeId: number;
}

export interface AddFavoriteMovieAction {
    type: typeof ADD_FAVORITE_MOVIE,
    payload: FavoriteMovieModel
}

export interface PutFavoriteMovieAction {
    type: typeof PUT_FAVORITE_MOVIES,
    payload: FavoriteMovieModel[]
}

export interface DeleteFavoriteMovieAction {
    type: typeof DELETE_FAVORITE_MOVIE,
    payload: {
        id: string | number
    }
}

export type FavoriteMovieActionTypes = 
    AddFavoriteMovieAction | 
    PutFavoriteMovieAction |
    DeleteFavoriteMovieAction;