import { TMDbMediaType } from "../../../globals";
import { TMDbProductionCompany, TMDbEpisode, TMDbNetwork, TMDbSeason, TMDbMovie, TMDbTVShow, TMDbFilmDetails, TMDbVideo } from "../../types";

export const TOGGLE_FILM_MODAL = 'TOGGLE_FILM_MODAL';
export const SET_FILM_MODAL_DETAILS = 'SET_FILM_MODAL_DETAILS';

export interface FilmDetailProps {
  id?: number;
  title?: string;
  backdrop_path?: string;
  genre_ids?: number[];
  homepage?: string;
  original_language?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  state?: string;
  vote_average?: number;
  vote_count?: number;
  budget?: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  adult?: boolean;
  release_date?: string;
  original_title?: string;
  original_name ?: string;
  video?: boolean; 
  episode_run_time?: number[];
  first_air_date?: string;
  origin_country?: string[];
  in_production?: boolean;
  last_air_date?: string;
  last_episode_to_air?: TMDbEpisode;
  name?: string;
  next_episode_to_air?: TMDbEpisode;
  networks?: TMDbNetwork;
  number_of_episodes?: number;
  number_of_seasons?: number;
  production_companies?: TMDbProductionCompany[];
  seasons?: TMDbSeason[];
  type?: string;
}

export interface FilmModalState {
  isOpen?: boolean;
  filmId?: number;
  isLoading?: boolean;
  mediaType?: TMDbMediaType,
  filmDetails?: FilmDetailProps
  videos?: any[];
}

export interface ToggleFilmModalAction {
  type: typeof TOGGLE_FILM_MODAL,
  payload: {}
};

export interface SetFilmModalDetailsAction {
  type: typeof SET_FILM_MODAL_DETAILS,
  payload: {
    filmDetails: FilmDetailProps,
    videos: TMDbVideo[]
  }
};

export type FilmModalActionTypes = 
  ToggleFilmModalAction |
  SetFilmModalDetailsAction;