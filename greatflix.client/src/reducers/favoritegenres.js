export const favoriteGenresReducer = (favoriteGenresState, action) => {
  var newFavoriteGenresState = favoriteGenresState;
  switch (action.type) {
    case 'add':
      newFavoriteGenresState.push(action.newFavoriteGenre);
      return newFavoriteGenresState;
    case 'put':
      newFavoriteGenresState = action.newFavoriteGenres;
      return newFavoriteGenresState;
    case 'delete':
      newFavoriteGenresState.filter(favoriteGenre => favoriteGenre.id = action.id);
      return newFavoriteGenresState;
    default:
      return favoriteGenresState;
  }
}
