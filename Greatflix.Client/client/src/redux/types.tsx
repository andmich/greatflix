import { AccountModel } from './reducers/account/types';
import { FavoriteGenreModel } from './reducers/favoriteGenres/types';
import { FavoriteMovieModel } from './reducers/favoriteMovies/types';
import { MovieModalState } from './reducers/movieModal/types';
import { FilmModalState } from './reducers/filmModal/types';

export interface GreatflixState {
    Account: AccountModel,
    FavoriteGenres: FavoriteGenreModel[],
    FavoriteMovies: FavoriteMovieModel[],
    MovieModal: MovieModalState,
    FilmModal: FilmModalState,
}

interface IsErrorResponse {
    isError: boolean;
    errorMessages: string[]
}

export interface GetResponse<T> {
    result: T;
}

export interface GetMultipleResponse<T> extends IsErrorResponse {
    results: T[];
    totalResults: number;
    page: number;
}

export interface GetAppendedResponse<TEntity, TAppendedEntity> extends GetResponse<TEntity> {
    appendedResults: TAppendedEntity[]
}

interface FilmBase {
    id: number;
    backdrop_path: string;
    genre_ids: number[];
    homepage: string;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    state: string;
    vote_average: number;
    vote_count: number;
}

export interface TMDbMovie extends FilmBase {
    budget: number;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    adult: boolean;
    release_date: string;
    original_title: string;
    title: string;
    video: boolean; 
    production_companies: TMDbProductionCompany[]
}

export interface TMDbTVShow extends FilmBase {
    episode_run_time: number[];
    first_air_date: string;
    origin_country: string[];
    in_production: boolean;
    last_air_date: string;
    last_episode_to_air: TMDbEpisode;
    name: string;
    next_episode_to_air: TMDbEpisode;
    networks: TMDbNetwork;
    number_of_episodes: number;
    number_of_seasons: number;
    original_name: string;
    production_companies: TMDbProductionCompany[];
    seasons: TMDbSeason[];
    type: string;
}

export interface TMDbEpisode {
    id: number;
    air_date: string;
    episode_number: number;
    name: string;
    overview: string;
    production_code: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}

export interface TMDbNetwork {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
}

export interface TMDbSeason {
    id: number;
    air_date: string;
    episode_count: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

export interface TMDbProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface TMDbTrending extends FilmBase {
    original_title: string;
    title: string;
    video: boolean;
}

export interface TMDbPerson {
    id: number;
    profile_path: string;
    adult: boolean;
    known_for: any[]
    name: string;
    popularity: number;
}

export interface TMDbVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}

export interface TMDbFilmDetails<T> {
    details: T;
    videos: any[];
}