using Greatflix.Common.ThirdParty.TMDb.Messages;
using Greatflix.Common.ThirdParty.TMDb.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Common.ThirdParty.TMDb
{
    public interface ITMDbClient : IThirdPartyClient
    {
        //Task<TMDbResponse<T>> GetPopularAsync<T>(GetPopularRequest request);
        Task<GetMultipleResponse<Genre>> GetGenres(GetGenresRequest request);
        Task<GetMultipleResponse<Movie>> SearchMoviesAsync(SearchMovieRequest request);
        Task<GetResponse<Movie>> GetMovieAsync(GetMovieRequest request);
        Task<GetAppendedResponse<Movie, Video>> GetMovieDetailsAsync(GetMovieRequest request);
        Task<GetMultipleResponse<Movie>> DiscoverMoviesAsync(DiscoverMoviesRequest request);
        Task<GetMultipleResponse<TVShow>> DiscoverTVShowsAsync(DiscoverTVShowsRequest request);
        Task<GetMultipleResponse<Trending>> GetTrendingAsync(GetTrendingRequest request);
        Task<GetMultipleResponse<TMDbPerson>> GetPopularActorsAsync(Request request);
        Task<GetResponse<Movie>> GetLatestMovieAsync(Request request);
        Task<GetMultipleResponse<Movie>> GetNowPlayingMoviesAsync(Request request);
        Task<GetMultipleResponse<Movie>> GetPopularMoviesAsync(Request request);
        Task<GetMultipleResponse<Movie>> GetTopRatedMoviesAsync(Request request);
        Task<GetMultipleResponse<Movie>> GetUpcomingMoviesAsync(Request request);
        Task<GetAppendedResponse<TVShow, Video>> GetTVShowDetailsAsync(GetTVShowDetailsRequest request);
    }
}
