import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieSlider from '../../components/slider/movieslider';
import Preloader from '../../components/preloader/preloader';
import { BasicMovieGenreList, TMDbMovieGenres, MovieCategories, TMDbMediaType } from '../../globals';
import { toggleMovieModal, setMovieModalDetails } from '../../redux/reducers/movieModal/actions';
import {
  fetchMovieById,
  fetchPopularMovies,
  fetchMovieByGenreId,
  fetchMovieDetails,
  fetchMoviesByCategory
} from './moviesApi';
import './movies.css';
import { ToggleMovieModalAction, SetMovieModalDetailsAction } from '../../redux/reducers/movieModal/types';
import { TMDbMovie, TMDbFilmDetails, GetMultipleResponse } from '../../redux/types';
//import MovieModal from '../../components/modals/moviemodal';
import { withRouter, RouteProps, RouteComponentProps, Redirect } from 'react-router-dom';
import { TMDbApiResponse } from '../../utils/api/types';
import FilmModal from '../../components/modals/filmmodal/filmmodal';
import FilmGrid from '../../components/filmgrid/filmgrid';

interface MoviesProps extends RouteComponentProps<{
  category: 'now-playing' | 'popular' | 'top-rated' | 'upcoming'
}> {
  toggleMovieModal?: () => void;
  setMovieModalDetails?: (movieDetails: TMDbFilmDetails<TMDbMovie>) => SetMovieModalDetailsAction;
}

interface MovieStore {
  isLoading: boolean;
  isFailed: boolean;
  data: GetMultipleResponse<TMDbMovie>
}

const Movies: React.FC<MoviesProps> = (props: MoviesProps) => {
  // TODO: move this to redux 
  const [movies, setMovies] = useState<MovieStore>({
    isLoading: true,
    isFailed: false,
    data: {
      results: [],
      totalResults: 0,
      page: 1,
      isError: false,
      errorMessages: []
    }
  });

  const controller = new AbortController();

  const fetchMovieByCategory = (category: 'latest' | 'now-playing' | 'popular' | 'top-rated' | 'upcoming') => {
    fetchMoviesByCategory(category)
      .then((data) => {
        console.log(data)
        setMovies({isFailed: false, isLoading: false, data: data})
      });
  }

  const handleOnClickMovieImage = async (movieId: number) => {
    props.toggleMovieModal && props.toggleMovieModal()
    const result = await fetchMovieDetails(movieId);
    props.setMovieModalDetails && props.setMovieModalDetails(result);
  }

  useEffect(() => {
    // only fetch if it is a valid category
    if (MovieCategories[props.match.params.category])
      setMovies({
        isLoading: true,
        ...movies
      });
      fetchMovieByCategory(props.match.params.category);
    return () => {
      controller.abort();
    }
  }, [props.match.params.category]);

  if (!MovieCategories[props.match.params.category]) {
    return (
      <Redirect
        to='/'/>
    );
  }
  return (
    <div>
      <div className='section'>
        <h1 className='title slider-title'>{MovieCategories[props.match.params.category]}</h1>
      </div>

      <div className='columns'>
        <div className='column is-three-quarters'>
          <Preloader  
            isLoading={movies.isLoading}
            component={
              <FilmGrid 
                mediaType={TMDbMediaType.movie}
                data={movies && movies.data.results.map((item) => ({
                  filmId: item.id,
                  title: item.original_title,
                  subtitle: '',
                  description: '',
                  imagePath: `${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`
                }))}
                onClickSlide={() => {}}
              />
            }/>
        </div>
        <div className='column'>

        </div>
      </div>

      <FilmModal />
    </div>
  )
}

const MoviesWithRouter = withRouter(Movies);

const mapDispatchToProps = {
  toggleMovieModal,
  setMovieModalDetails
}

export default connect(
  null,
  mapDispatchToProps
)(MoviesWithRouter);