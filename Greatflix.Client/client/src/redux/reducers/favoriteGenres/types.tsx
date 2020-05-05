export const ADD_FAVORITE_GENRE = 'ADD_FAVORITE_GENRE';
export const PUT_FAVORITE_GENRES = 'PUT_FAVORITE_GENRES';
export const DELETE_FAVORITE_GENRE = 'DELETE_FAVORITE_GENRE';

export interface FavoriteGenreModel {
    id: string | number;
    userId: string | number;
    genreId: string | number;
}

export interface AddFavoriteGenreAction {
    type: typeof ADD_FAVORITE_GENRE,
    payload: FavoriteGenreModel
}

export interface PutFavoriteGenreAction {
    type: typeof PUT_FAVORITE_GENRES,
    payload: FavoriteGenreModel[]
}

export interface DeleteFavoriteGenreAction {
    type: typeof DELETE_FAVORITE_GENRE,
    payload: {
        id: string | number
    }
}

export type FavoriteGenreActionTypes = 
    AddFavoriteGenreAction |
    PutFavoriteGenreAction |
    DeleteFavoriteGenreAction;