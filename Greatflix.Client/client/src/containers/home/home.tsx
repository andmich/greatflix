import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { 
  TMDbTrending, 
  TMDbPerson, 
  GreatflixState, 
  TMDbMovie, 
  TMDbTVShow, 
  TMDbVideo, 
  GetAppendedResponse 
} from '../../redux/types';
import { 
  fetchTrending, 
  fetchPopularActors, 
  fetchTVShowById 
} from './homeApi';
import { 
  GFButton 
} from '../../components/inputs/greatflixbutton';
import GFSlider, { GFDataProps } from '../../components/slider/gfslider';
import { 
  ToggleFilmModalAction, 
  SetFilmModalDetailsAction 
} from '../../redux/reducers/filmModal/types';
import {
  toggleFilmModal,
  setFilmModalDetails
} from '../../redux/reducers/filmModal/actions';
import FilmModal from '../../components/modals/filmmodal/filmmodal';
import { connect } from 'react-redux';
import './home.css';
import { TMDbMediaType, TMDbTimeWindow } from '../../globals';
import { fetchMovieById } from '../movies/moviesApi';

interface HomeProps {
  toggleFilmModal?: () => ToggleFilmModalAction;
  setFilmModalDetails?: (filmDetails: GetAppendedResponse<TMDbMovie | TMDbTVShow, TMDbVideo>) => SetFilmModalDetailsAction;
  togglePersonModal?: () => void;
}

interface TrendingState {
  isLoading: boolean;
  trending: TMDbTrending[];
  mediaType: TMDbMediaType;
  timeWindow: TMDbTimeWindow;
}

const initialTrendingState = {
  isLoading: true,
  trending: [],
  mediaType: TMDbMediaType.movie,
  timeWindow: TMDbTimeWindow.week
};

interface PopularActorsState {
  isLoading: boolean;
  popular: TMDbPerson[];
}

const initialPopularActorsState = {
  isLoading: true,
  popular: []
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const [trendingState, setTrendingState] = useState<TrendingState>(initialTrendingState);
  const [popularActorsState, setPopularActorsState] = useState<PopularActorsState>(initialPopularActorsState);

  const handleChangeMediaType = (mediaType: TMDbMediaType) => {
    if (trendingState.mediaType !== mediaType) {
      setTrendingState({
        ...trendingState,
        mediaType: mediaType,
        isLoading: true
      });
      fetchTrending(mediaType, trendingState.timeWindow)
        .then(data => {
          setTrendingState({
            ...trendingState,
            mediaType: mediaType,
            isLoading: false,
            trending: data
          });
        })
        .catch(err => {
          console.log(err);
          setTrendingState({
            ...trendingState,
            mediaType: mediaType,
            isLoading: false
          });
        })
    }
  }

  const handleChangeTimeWindow = (timeWindow: TMDbTimeWindow) => {
    if (trendingState.timeWindow !== timeWindow) {
      setTrendingState({
        ...trendingState,
        timeWindow: timeWindow,
        isLoading: true
      });
      fetchTrending(trendingState.mediaType, timeWindow)
        .then(data => {
          setTrendingState({
            ...trendingState,
            isLoading: false,
            timeWindow: timeWindow,
            trending: data
          })
        })
        .catch(err => {
          console.log(err);
          setTrendingState({
            ...trendingState,
            timeWindow: timeWindow,
            isLoading: false
          });
        });
    }
  }

  const handleOpenFilmModal = async (filmId: number, mediaType: TMDbMediaType) => {
    props.toggleFilmModal && props.toggleFilmModal();
    const results = mediaType === TMDbMediaType.movie ? 
      await fetchMovieById(filmId) :
      await fetchTVShowById(filmId, 1);// change to tv
    props.setFilmModalDetails && props.setFilmModalDetails(results)
  }

  useEffect(() => {
    fetchTrending(trendingState.mediaType, trendingState.timeWindow)
      .then(data => {
        setTrendingState({
          ...trendingState,
          isLoading: false,
          trending: data
        });
      })
      .catch(err => {
        console.log(err);
      });

    fetchPopularActors()
      .then(data => {
        setPopularActorsState({
          isLoading: false,
          popular: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className='section has-background-black-bis' style={styles.homeSection}>
        <div className='content is-large'>
          <section className='hero has-text-primary'>
            <h1 className='title has-text-primary'>
              Welcome to Greatflix!
            </h1>
            <h4 className='subtitle has-text-primary'>
              Remember your favorite movies and TV shows. Leave reviews and view trailers!
            </h4>
            <div className='field has-addons'>
              <div className='control is-expanded'>
                <input className='input' type='text' placeholder='Find your favorite movie!' />
              </div>
              <div className='control'>
                <a className='button is-info'>
                  Find
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div id='trending' className='section'>
        <div style={
          styles.sectionHeader
        }>
          <h1 className='title'>Trending</h1>
          <div className='field is-grouped'>
            <p className='control'>
              <div className='buttons has-addons'>
                <GFButton
                  isSelected={trendingState.mediaType === TMDbMediaType.all}
                  isLoading={trendingState.mediaType === TMDbMediaType.all ? trendingState.isLoading : false}
                  className={trendingState.mediaType === TMDbMediaType.all ? 'is-primary' : ''}
                  onClick={() => handleChangeMediaType(TMDbMediaType.all)}
                  text='All'/>

                <GFButton
                  isSelected={trendingState.mediaType === TMDbMediaType.movie}
                  isLoading={trendingState.mediaType === TMDbMediaType.movie ? trendingState.isLoading : false}
                  className={trendingState.mediaType === TMDbMediaType.movie ? 'is-primary' : ''}
                  onClick={() => handleChangeMediaType(TMDbMediaType.movie)}
                  text='Movies'/>

                <GFButton
                  isSelected={trendingState.mediaType === TMDbMediaType.tv}
                  isLoading={trendingState.mediaType === TMDbMediaType.tv ? trendingState.isLoading : false}
                  className={trendingState.mediaType === TMDbMediaType.tv ? 'is-primary' : ''}
                  onClick={() => handleChangeMediaType(TMDbMediaType.tv)}
                  text='TV Shows'/>
              </div>
            </p>
            <p className='control'>
              <div className='buttons has-addons'>
                <GFButton
                  isSelected={trendingState.timeWindow === TMDbTimeWindow.day}
                  isLoading={trendingState.timeWindow === TMDbTimeWindow.day ? trendingState.isLoading : false}
                  className={trendingState.timeWindow === TMDbTimeWindow.day ? 'is-link' : ''}
                  onClick={() => handleChangeTimeWindow(TMDbTimeWindow.day)}
                  text='Today'/>

                <GFButton
                  isSelected={trendingState.timeWindow === TMDbTimeWindow.week}
                  isLoading={trendingState.timeWindow === TMDbTimeWindow.week ? trendingState.isLoading : false}
                  className={trendingState.timeWindow === TMDbTimeWindow.week ? 'is-link' : ''}
                  onClick={() => handleChangeTimeWindow(TMDbTimeWindow.week)}
                  text='This Week'/>
              </div>
            </p>
          </div>
        </div>
        <GFSlider
          data={trendingState.trending.map((item, idx): GFDataProps => {
            return ({
              filmId: item.id,
              title: item.original_title ? item.original_title : item.title,
              subtitle: '',
              description: '',
              imagePath:`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`
            });
          })}
          mediaType={trendingState.mediaType}
          onClickSlide={(filmId: number = 0, mediaType: TMDbMediaType) => handleOpenFilmModal(filmId, mediaType)}/>
      </div>

      <div id='popular-actors' className='section'>
        <div style={styles.sectionHeader}>
          <h1 className='title'>Popular Actors and Actresses</h1>
        </div>  
        <GFSlider 
          data={popularActorsState.popular.map((item, idx): GFDataProps => {
            return ({
              title: item.name,
              subtitle: '',
              description: '',
              imagePath: `${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.profile_path}`
            });
          })}
          mediaType={trendingState.mediaType}
          onClickSlide={() => null}
        />
      </div>

      <FilmModal />
    </>
  )
}

const mapStateToProps = (state: GreatflixState, ownProps: HomeProps) => ({
  ...ownProps
});

const mapDispatchToProps = {
  toggleFilmModal,
  setFilmModalDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);