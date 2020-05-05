import { 
    ADD_FAVORITE_GENRE,
    PUT_FAVORITE_GENRES,
    DELETE_FAVORITE_GENRE,
    FavoriteGenreModel,
    FavoriteGenreActionTypes
} from './types';

const initialState: FavoriteGenreModel[] = [];

export default (state: FavoriteGenreModel[] = initialState, action: FavoriteGenreActionTypes) => {
    switch (action.type) {
        case ADD_FAVORITE_GENRE:
            const favoriteGenre = action.payload;
            return [
                ...state,
                favoriteGenre
            ];
        case PUT_FAVORITE_GENRES:
            const favoriteGenres = action.payload;
            return favoriteGenres;
        case DELETE_FAVORITE_GENRE:
            const newState = state
                .filter(genre => genre.id === action.payload.id);
            return newState;
        default: 
            return state;
    }
}