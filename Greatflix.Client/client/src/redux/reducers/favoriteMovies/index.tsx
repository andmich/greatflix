import {
    ADD_FAVORITE_MOVIE,
    PUT_FAVORITE_MOVIES,
    DELETE_FAVORITE_MOVIE,
    FavoriteMovieModel,
    FavoriteMovieActionTypes
} from './types';

const initialState: FavoriteMovieModel[] = [];

export default (state: FavoriteMovieModel[] = initialState, action: FavoriteMovieActionTypes) => {
    switch (action.type) {
        case ADD_FAVORITE_MOVIE:
            return [
                ...state,
                action.payload
            ];
        case PUT_FAVORITE_MOVIES:
            return action.payload;
        case DELETE_FAVORITE_MOVIE:
            const newState = state.filter(movie => movie.id === action.payload.id);
            return newState;
        default:
            return state;
    }
}