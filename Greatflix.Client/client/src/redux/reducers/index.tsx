import { combineReducers } from 'redux';
import Account from './account';
import FavoriteGenres from './favoriteGenres';
import FavoriteMovies from './favoriteMovies';
import MovieModal from './movieModal';
import FilmModal from './filmModal';

export default combineReducers({ Account, FavoriteGenres, FavoriteMovies, MovieModal, FilmModal });