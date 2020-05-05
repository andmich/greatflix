import { 
  TMDbFilmDetails, 
  TMDbMovie, 
  TMDbVideo, 
  GetAppendedResponse, 
  GetMultipleResponse
} from "../../redux/types";
import { 
  GreatflixApiResponse,
  TMDbApiResponse
 } from '../../utils/api/types';

export const fetchMovieById = async (movieId: number) : Promise<GetAppendedResponse<TMDbMovie, TMDbVideo>> => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/${movieId}?appendToResponse=videos`))
    .json()
        .then((data: GetAppendedResponse<TMDbMovie, TMDbVideo>) : GetAppendedResponse<TMDbMovie, TMDbVideo> => {
          console.log('results', data.result);
          console.log('videos: ', data.appendedResults)
          return data
        })
        .catch(err => {
          console.log(err);
          throw err;
        });   
}


export const fetchPopularMovies = async () : Promise<TMDbApiResponse<TMDbMovie>> => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/popular?page=1`))
    .json()
    .then((data: GreatflixApiResponse<TMDbApiResponse<TMDbMovie>>) : TMDbApiResponse<TMDbMovie> => {
      return data.result;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

export const fetchMovieByGenreId = async (genreId: number, controller: AbortController) : Promise<TMDbApiResponse<TMDbMovie>> => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/discover?page=1&genres=${genreId}`, { signal: controller.signal}))
    .json()
    .then((data: GreatflixApiResponse<TMDbApiResponse<TMDbMovie>>) : TMDbApiResponse<TMDbMovie> => {
      return data.result;
    })
    .catch (err => {
      console.log(err);
      throw err;
    });
}
export const fetchMovieDetails = async (movieId: number) : Promise<TMDbFilmDetails<TMDbMovie>> => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/${movieId}?appendToResponse=videos`))
    .json()
    .then((data: GreatflixApiResponse<TMDbFilmDetails<TMDbMovie>>) : TMDbFilmDetails<TMDbMovie> => {
      return data.result;
    })
    .catch (err => {
      console.log(err);
      throw err;
    });
}

export const fetchMoviesByCategory = async (category: 'latest' | 'now-playing' | 'popular' | 'top-rated' | 'upcoming') : Promise<GetMultipleResponse<TMDbMovie>> => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/movies/${category}`))
    .json()
    .then((data: GetMultipleResponse<TMDbMovie>) : GetMultipleResponse<TMDbMovie> => {
      return data;
    })
    .catch (err => {
      console.log(err);
      throw err;
    });
}