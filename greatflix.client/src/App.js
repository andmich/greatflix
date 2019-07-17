import React from 'react';
import logo from './logo.svg';

// css
import './App.css';
import 'bulma/css/bulma.css'

// compnents
import Navbar from './components/navbar/navbar';
import MovieSlider from './components/movieslider/movieslider';


class App extends React.Component {
  componentDidMount() {
    // get movie genres
  }
  render () {
    return(
      <div className="App">
        <Navbar />

        <MovieSlider
          title='Favorites'
          />
      </div>
    );
  }
}

export default App;
