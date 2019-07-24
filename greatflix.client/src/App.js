import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// css
import './App.css';
import 'bulma/css/bulma.css'

// compnents
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';
import Movie from './components/movie/movie';
import Settings from './components/settings/settings';

const App = (props) => {

  return(
    <div className="App">
      <Router>
        <Navbar />

        <Route
          path='/'
          exact
          component={Main}/>

        <Route
          path='/movie/:movieId'
          exact
          component={Movie}/>

        <Route
          path='/settings'
          exact
          component={Settings}/>
      </Router>
    </div>
  );
}

export default App;
