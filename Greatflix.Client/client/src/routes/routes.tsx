import React, { useState, useEffect } from 'react';
import { Route, Redirect, match, withRouter } from 'react-router-dom';
/*
import Navbar from './components/navbar/navbar';
import Shows from './components/main/shows';
import Preloader from './components/preloader/preloader';
*/
import Home from '../containers/home/home';
import Movies from '../containers/movies/movies';
import Settings from '../privatecomponents/settings/settings';

import { TMDbMovieGenres } from '../globals';
// css
import 'bulma/css/bulma.css'

export interface RoutesProps {
    match: match
}

const Routes : React.FC<RoutesProps> = (props: RoutesProps) => {
    return(
      <>
            <Route 
                path='/'
                exact
                component={Home}/>
            <Route
                path='/movies/:category'
                exact
                component={Movies}/>
  
            {/* <Route
                path='/shows'
                exact
                component={Shows}/> */}
           
            <Route
                path='/settings'
                exact
                component={Settings}/>
  
            {/* {props.match.path === '/'  && (
                <Redirect
                    to={{
                    pathname: '/movies'
                }}/>
            )} */}
      </>
    );
  }
  
  export default withRouter(Routes);
  