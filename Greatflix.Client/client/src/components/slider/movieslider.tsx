import React from 'react';
import Slider from './slider';
import { useState } from 'react';
//import MovieModal from '../modals/moviemodal';
import { toggleMovieModal } from '../../redux/reducers/movieModal/actions';
import { connect } from 'react-redux';
import { GreatflixState } from '../../redux/types';
import { ToggleMovieModalAction } from '../../redux/reducers/movieModal/types';

interface TMDbMovieModel {
    id: number;
    poster_path?: string;
    title?: string;
}

interface MovieSliderProps {
    onClickMovieImage: (movieId: number) => void;
    movies: TMDbMovieModel[]
}

interface ModalState {
    isOpen: boolean;
    movieId: number;
}

const MovieSlider : React.FC<MovieSliderProps> = (props: MovieSliderProps) => {
    const uniqueId = (Math.random() * 1000).toFixed(0);
    const [modalState, setModalState] = useState<ModalState>({isOpen: false, movieId: -1});

    const {
        onClickMovieImage
    } = props;

    return (
        <div>
            <Slider>
                {props.movies && props.movies.map((item, idx) => {
                    return(
                    <img
                        onClick={() => {
                            onClickMovieImage(item.id);
                        }}
                        key={idx}
                        src={`${process.env.REACT_APP_MOVIE_IMAGE_ENDPOINT}/w185${item.poster_path}`}
                        alt={item.title}/>
                    )
                })}
            </Slider>
            {/* 
            <MovieModal
                isOpen={modalState.isOpen}
                movieId={modalState.movieId}
                onClose={() => setModalState({isOpen: false, movieId: -1})}/> 
            */}
        </div>
    );
}

const mapStateToProps = (state: GreatflixState, ownProps: MovieSliderProps) => ({
    ...ownProps
});

const mapDispatchToProps = {
    //toggleMovieModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieSlider);