export const favoriteMoviesReducer = (favoriteMoviesState, action) => {
  var newFavoriteMoviesState = favoriteMoviesState;
  switch (action.type) {
    case 'add':
      newFavoriteMoviesState.push(action.newFavoriteMovie);
      return newFavoriteMoviesState;
    case 'put':
      break;
    case 'update':
      break;
    case 'delete':
      break;
    default:
      return newFavoriteMoviesState;
  }
}
