import React from 'react';
import { useAuth0 } from '../../../auth-wrapper';
import {
  TMDbMediaType
} from '../../../globals';
import Modal from '../../modals/modal';
import Preloader from '../../preloader/preloader';
import {
  GreatflixState
} from '../../../redux/types';
import { 
  FilmDetailProps 
} from '../../../redux/reducers/filmModal/types';
import {
  toggleFilmModal
} from '../../../redux/reducers/filmModal/actions';
import { connect } from 'react-redux';

export interface FilmModalProps {
  isOpen?: boolean;
  isLoading?: boolean;
  filmId?: number;
  mediaType?: TMDbMediaType
  filmDetails?: FilmDetailProps;
  videos?: any[];
  favoriteFilmIds?: number[];
  toggleFilmModal?: () => void;
}

const FilmModal: React.FC<FilmModalProps> = ({
  isOpen = false,
  isLoading = true,
  filmId = 0,
  mediaType = TMDbMediaType.movie,
  filmDetails = {
    title: '',
    poster_path: '',
    overview: '',
    status: '',
    budget: 0,
    revenue: 0,
  },
  favoriteFilmIds = [],
  videos = [],
  toggleFilmModal
}: FilmModalProps) => {
  const auth0Context = useAuth0();
  const getTokenSilently = auth0Context && auth0Context.getTokenSilently;

  const handleModalClose = () => {
    toggleFilmModal && toggleFilmModal();
  }

  const handleAddToFavorites = (filmId: number) => {

  }

  const isFavorite = favoriteFilmIds
    .some(film => film === filmId);

  const detailsTable = filmDetails && mediaType === TMDbMediaType.movie ? 
    <tbody>
      <tr>
        <td><strong>Status</strong></td>
        <td><span className='tag is-success'>{filmDetails.status}</span></td>
      </tr>
      <tr>
        <td><strong>Budget</strong></td>
        <td>${filmDetails.budget && filmDetails.budget.toLocaleString()}</td>
      </tr>
      <tr>
        <td><strong>Revenue</strong></td>
        <td>${filmDetails.revenue && filmDetails.revenue.toLocaleString()}</td>
      </tr>
      <tr>
        <td><strong>Profit</strong></td>
        <td>
            {filmDetails.revenue && filmDetails.budget ?
              filmDetails.revenue - filmDetails.budget < 0 ?
              <span style={{color: 'red'}}>{`-$${(Math.abs(filmDetails.revenue - filmDetails.budget)).toLocaleString()}`}</span> :
              <span style={{color: 'green'}}>{`$${(Math.abs(filmDetails.revenue - filmDetails.budget)).toLocaleString()}`}</span> : ''
            }
        </td>
      </tr>
    </tbody> : mediaType === TMDbMediaType.tv ? 
    <tbody>
      <td>
        <td>Status</td>
        <td>
          {filmDetails.in_production && (
            <span className='tag is-info'>In Production</span>
          )}
          {!filmDetails.in_production && (
            <span className='tag is-danger'>Production Stopped</span>
          )}
        </td>
      </td>
      <tr>
        <td><strong>First Aired</strong></td>
        <td>{filmDetails.first_air_date}</td>
      </tr>
      <td>
        <td>Season Count</td>
        <td>{filmDetails.number_of_seasons}</td>
      </td>
      <td>
        <td>Episode Count</td>
        <td>{filmDetails.number_of_episodes}</td>
      </td>
    </tbody> : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={filmDetails && filmDetails.title && filmDetails.title}>
      <Preloader  
        isLoading={isLoading}
        component={
          <>
            <div className='movie-modal-content'>
              <div className='columns'>
                <div className='column is-one-third'>
                  <img
                    src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${filmDetails && filmDetails.poster_path}`}
                    alt={filmDetails && filmDetails.title}
                    style={{display: 'block', margin: 'auto'}}/>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5px'}}>
                    {isFavorite && (
                      <a
                        className='button is-danger'
                        onClick={() => handleAddToFavorites(filmId)}>
                        Remove from Favorites
                      </a>
                    )}
                    {!isFavorite && (
                      <a
                        className='button is-success'
                        onClick={() => handleAddToFavorites(filmId)}>
                        Add to Favorites
                      </a>
                    )}
                  </div>

                  <hr />

                  <table className='table'>
                    {detailsTable}
                  </table>
                </div>
                <div className='column'>
                  <p>
                    {filmDetails && filmDetails.overview}
                  </p>

                  {videos && videos.length > 0 ?
                    <div className='movie-video-container'>
                      <iframe
                        title={filmDetails && filmDetails.title}
                        width='100%'
                        height='0'
                        src={`https://www.youtube.com/embed/${videos[0].key}`}
                        frameBorder='0'
                        allowFullScreen
                        className='movie-video'>
                      </iframe>
                    </div> :
                    ''
                  }
                </div>
              </div>
              <hr />
              <div>
                <h5>Reviews</h5>
                <hr />
                <div>

                </div>

                <textarea className='textarea' placeholder='If you want, leave a review!' rows={10}></textarea>
              </div>
            </div>
          </>
        }/>
    </Modal>
  )
}

const mapStateToProps = (state: GreatflixState, ownProps: FilmModalProps) => {
  return {
    isOpen: state.FilmModal.isOpen,
    isLoading: state.FilmModal.isLoading,
    filmId: state.FilmModal.filmId,
    mediaType: state.FilmModal.mediaType,
    favoriteFilmIds: state.FilmModal.mediaType === TMDbMediaType.movie ? 
      state.FavoriteMovies
        .map((item) => item.filmId) 
        : undefined,
    filmDetails: state.FilmModal.filmDetails,
    videos: state.FilmModal.videos,
    ...ownProps
  };
}

const mapDispatchToProps = {
  toggleFilmModal
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmModal);