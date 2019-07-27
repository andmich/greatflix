import { favoriteGenresReducer } from './favoritegenres';
import { accountReducer } from './account';

export const mainReducer = ({ account, favoriteGenres }, action) => ({
  account: action.name === 'account' ? accountReducer(account, action) : account,
  favoriteGenres: action.name === 'favoriteGenres' ? favoriteGenresReducer(favoriteGenres, action) : favoriteGenres
});
