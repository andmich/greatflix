export const favoriteMoviesReducer = (favoriteMoviesState, action) => {
  var newFavoriteMoviesState = favoriteMoviesState;
  switch (action.type) {
    case 'add':
      newFavoriteMoviesState.push(action.newFavoriteMovie);
      return newFavoriteMoviesState;
    case 'put':
      newFavoriteMoviesState = action.newFavoriteMovies;
      return newFavoriteMoviesState;
    case 'update':
      break;
    case 'delete':
      break;
    default:
      return newFavoriteMoviesState;
  }
}
