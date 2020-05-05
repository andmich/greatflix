import { 
  TMDbTrending, 
  TMDbPerson, 
  TMDbTVShow,  
  GetMultipleResponse, 
  TMDbVideo, 
  GetAppendedResponse 
} from "../../redux/types";
import { 
  TMDbMediaType, 
  TMDbTimeWindow 
} from "../../globals";

export const fetchTrending = async (mediaType: TMDbMediaType, timeWindow: TMDbTimeWindow) => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/trending?MediaType=${mediaType}&TimeWindow=${timeWindow}`))
    .json()
    .then((data: GetMultipleResponse<TMDbTrending>) : TMDbTrending[] => {
      return data.results;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });  
}

export const fetchPopularActors = async () => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/people/popular`))
    .json()
    .then((data: GetMultipleResponse<TMDbPerson>) : TMDbPerson[] => {
      return data.results;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });  
}

export const fetchTVShowById = async (filmId: number, page: number) => {
  return (await fetch(`${process.env.REACT_APP_ENDPOINT}/tvshows/${filmId}?page=${page}`))
    .json()
    .then((data: GetAppendedResponse<TMDbTVShow, TMDbVideo>) : GetAppendedResponse<TMDbTVShow, TMDbVideo> => {
      return data;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}