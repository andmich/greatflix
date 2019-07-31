import { favoriteGenresReducer } from './favoritegenres';
import { favoriteMoviesReducer } from './favoriteMovies';
import { accountReducer } from './account';

export const mainReducer = ({
  account,
  favoriteGenres,
  favoriteMovies,
  favoriteShows
},
action) => ({
  account: action.name === 'account' ? accountReducer(account, action) : account,
  favoriteGenres: action.name === 'favoriteGenres' ? favoriteGenresReducer(favoriteGenres, action) : favoriteGenres,
  favoriteMovies: action.name === 'favoriteMovies' ? favoriteMoviesReducer(favoriteMovies, action) : favoriteMovies
});
