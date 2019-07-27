import React, { useContext, useReducer } from 'react';
import { mainReducer } from '../reducers/main';

var initialState = {
  account: {
    id: '',
    userId: ''
  },
  favoriteGenres: [],
  favoriteMovies: [],
  favoriteTVShows: []
}

export const StateContext = React.createContext();

export const StateProvider = ({children}) => (
  <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const StateConsumer = ({children}) => (
  <StateContext.Consumer>
    {children}
  </StateContext.Consumer>
)

export const useGlobalState = () => useContext(StateContext);
