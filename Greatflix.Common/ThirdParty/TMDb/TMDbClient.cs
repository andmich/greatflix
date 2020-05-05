using AutoWrapper.Wrappers;
using Greatflix.Common.ThirdParty.TMDb.Messages;
using Greatflix.Common.ThirdParty.TMDb.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static Greatflix.Common.ThirdParty.TMDb.TMDbCommon;

namespace Greatflix.Common.ThirdParty.TMDb
{
    public class TMDbClient : ThirdPartyClientBase<TMDbClient>, ITMDbClient
    {
        private readonly string _baseAddress;
        private readonly string _v3Key;
        private readonly string _v4Key;
        private HttpClient _httpClient = new HttpClient();

        public TMDbClient(AppSettings appSettings)
            : base(appSettings)
        {
            _baseAddress = _appSettings != null ? appSettings.TMDb.BaseAddress : throw new ArgumentNullException("appSettings");
            _v3Key = _appSettings.TMDb.ApiKeys.ContainsKey("v3") ? _appSettings.TMDb.ApiKeys["v3"] : throw new KeyNotFoundException("v3");
            _v4Key = _appSettings.TMDb.ApiKeys.ContainsKey("v4") ? _appSettings.TMDb.ApiKeys["v4"] : throw new KeyNotFoundException("v4");
        }

        public async Task<GetAppendedResponse<TVShow, Video>> GetTVShowDetailsAsync(GetTVShowDetailsRequest request)
        {
            return await ExecuteAsync<GetAppendedResponse<TVShow, Video>>(request, async response =>
            {
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/tv/{request.id}?api_key={_v3Key}&append_to_response=videos");

                if (getResponse.IsSuccessStatusCode)
                {
                    var responseString = await getResponse.Content.ReadAsStringAsync();

                    var tvshow = JsonConvert.DeserializeObject<TVShow>(await getResponse.Content.ReadAsStringAsync());
                    var appended = JsonConvert.DeserializeObject<AppendedVideos>(await getResponse.Content.ReadAsStringAsync());
                    response.Result = tvshow;
                    response.AppendedResult = appended.videos.results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetResponse<Movie>> GetLatestMovieAsync(Request request)
        {
            return await ExecuteAsync<GetResponse<Movie>>(request, async response =>
            {
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/movie/latest?api_key={_v3Key}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<Movie>(await getResponse.Content.ReadAsStringAsync());
                    response.Result = tmdbResponse;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<Movie>> GetNowPlayingMoviesAsync(Request request)
        {
            return await ExecuteAsync<GetMultipleResponse<Movie>>(request, async response =>
            {
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/movie/now_playing?api_key={_v3Key}&page={request.page}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<Movie>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<Movie>> GetPopularMoviesAsync(Request request)
        {
            return await ExecuteAsync<GetMultipleResponse<Movie>>(request, async response =>
            {
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/movie/popular?api_key={_v3Key}&page={request.page}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<Movie>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<Movie>> GetTopRatedMoviesAsync(Request request)
        {
            return await ExecuteAsync<GetMultipleResponse<Movie>>(request, async response =>
            {
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/movie/top_rated?api_key={_v3Key}&page={request.page}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<Movie>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }
        public async Task<GetMultipleResponse<Movie>> GetUpcomingMoviesAsync(Request request)
        {
            return await ExecuteAsync<GetMultipleResponse<Movie>>(request, async response =>
            {
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/movie/upcoming?api_key={_v3Key}&page={request.page}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<Movie>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<Genre>> GetGenres(GetGenresRequest request)
        {
            return await ExecuteAsync<GetMultipleResponse<Genre>>(request, async response =>
            {
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/genre/{request.mediaType}/list?api_key={_v3Key}&language={request.language}");

                if (getResponse.IsSuccessStatusCode)
                {
                    response.Results = JsonConvert.DeserializeObject<List<Genre>>(await getResponse.Content.ReadAsStringAsync());
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<Movie>> SearchMoviesAsync(SearchMovieRequest request)
        {
            return await ExecuteAsync<GetMultipleResponse<Movie>>(request, async response =>
            {
                var uriQuery = $"api_key={_v3Key}&query={request.query}&page={request.page}&year={request.year}&primary_release_year={request.primaryReleaseYear}&include_adult={request.includeAdult}&language={request.language}&region={request.region}";
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/search/movie?{uriQuery}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<Movie>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetResponse<Movie>> GetMovieAsync(GetMovieRequest request)
        {
            return await ExecuteAsync<GetResponse<Movie>>(request, async response =>
            {
                var uriQuery = $"api_key={_v3Key}&language={request.language}";
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/movie/{request.id}?{uriQuery}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<Movie>(getResponse.Content.ReadAsStringAsync().Result);
                    response.Result = tmdbResponse;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetAppendedResponse<Movie, Video>> GetMovieDetailsAsync(GetMovieRequest request)
        {
            return await ExecuteAsync<GetAppendedResponse<Movie, Video>>(request, async response =>
            {
                var uriQuery = $"api_key={_v3Key}&language={request.language}&append_to_response=videos";
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/movie/{request.id}?{uriQuery}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var resultResponseString = await getResponse.Content.ReadAsStringAsync();

                    var movie = JsonConvert.DeserializeObject<Movie>(resultResponseString);
                    var appendedVideos = JsonConvert.DeserializeObject<AppendedVideos>(resultResponseString);
                    response.Result = movie;
                    response.AppendedResult = appendedVideos.videos.results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<Movie>> DiscoverMoviesAsync(DiscoverMoviesRequest request)
        {
            return await ExecuteAsync<GetMultipleResponse<Movie>>(request, async response =>
            {
                var uriQuery = $"api_key={_v3Key}&page={request.page}&with_genres={string.Join(',', request.genres.ToArray())}&include_adult={request.includeAdult}&language={request.language}&region={request.region}";
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/discover/movie?{uriQuery}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<Movie>>(await getResponse.Content.ReadAsStringAsync());;
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<TVShow>> DiscoverTVShowsAsync(DiscoverTVShowsRequest request)
        {
            return await ExecuteAsync<GetMultipleResponse<TVShow>>(request, async response =>
            {
                var uriQuery = $"api_key={_v3Key}&page={request.page}&with_genres={string.Join(',', request.genres.ToArray())}&language={request.language}&region={request.region}";
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/discover/tv?{uriQuery}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<TVShow>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<Trending>> GetTrendingAsync(GetTrendingRequest request)
        {
            return await ExecuteAsync<GetMultipleResponse<Trending>>(request, async response =>
            {
                var uriQuery = $"api_key={_v3Key}";
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/trending/{request.MediaType.ToString("g")}/{request.TimeWindow.ToString("g")}?{uriQuery}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<Trending>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        public async Task<GetMultipleResponse<TMDbPerson>> GetPopularActorsAsync(Request request)
        {
            return await ExecuteAsync<GetMultipleResponse<TMDbPerson>>(request, async response =>
            {
                var uriQuery = $"api_key={_v3Key}";
                var getResponse = await _httpClient.GetAsync($"{_baseAddress}/person/popular?{uriQuery}");

                if (getResponse.IsSuccessStatusCode)
                {
                    var tmdbResponse = JsonConvert.DeserializeObject<TMDbResponse<TMDbPerson>>(await getResponse.Content.ReadAsStringAsync());
                    response.Page = tmdbResponse.page;
                    response.Results = tmdbResponse.results;
                    response.TotalPages = tmdbResponse.total_pages;
                    //response.TotalResults = tmdbResponse.total_results;
                }
                else
                {
                    throw new ApiException(await getResponse.Content.ReadAsStringAsync(), statusCode: (int)getResponse.StatusCode);
                }
            });
        }

        bool disposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed) { return; }
            if (disposing) { _httpClient.Dispose(); }

            disposed = true;
        }
    }
}
