using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using greatflix.common.Clients.TMDb.Models;
using static greatflix.common.Clients.TMDb.TMDbCommon;

namespace greatflix.common.Clients.TMDb
{
    public class TMDbClient : IDisposable
    {
        private string _baseAddress = "https://api.themoviedb.org/3";

        private readonly string _apiKey;
        private HttpClient _httpClient = new HttpClient();

        public TMDbClient(string apiKey)
        {
            _apiKey = apiKey ?? throw new ArgumentNullException("apiKey");
        }

        #region Genres 
        public TMDbGenres GetGenres(FilmType mediaType, string language = "English")
        {
            var getResponse = _httpClient.GetAsync($"{_baseAddress}/genre/{mediaType}/list?api_key={_apiKey}&language={language}");
            getResponse.Wait();

            var result = getResponse.Result;

            if (result.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<TMDbGenres>(result.Content.ReadAsStringAsync().Result);
            }
            else
            {
                throw new Exception(result.Content.ReadAsStringAsync().Result);
            }
        }
        #endregion

        #region Movies 

        public TMDbResponse<TMDbMovie> SearchMovies(string query, int? page, int? year, int? primaryReleaseYear, bool includeAdult = false, string language = "English", string region = "US")
        {
            var uriQuery = $"api_key={_apiKey}&query={query}&page={page}&year={year}&primary_release_year={primaryReleaseYear}&include_adult={includeAdult}&language={language}&region={region}";
            var getResponse = _httpClient.GetAsync($"{_baseAddress}/search/movie?{uriQuery}");
            getResponse.Wait();

            var result = getResponse.Result;

            if (result.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<TMDbResponse<TMDbMovie>>(result.Content.ReadAsStringAsync().Result);
            }
            else
            {
                throw new Exception(result.Content.ReadAsStringAsync().Result);
            }
        }

        public TMDbResponse<TMDbMovie> GetMovie(int id, string language = "English")
        {
            var uriQuery = $"api_key={_apiKey}&language={language}";
            var getResponse = _httpClient.GetAsync($"{_baseAddress}/movie/{id}/{uriQuery}");
            getResponse.Wait();

            var result = getResponse.Result;

            if (result.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<TMDbResponse<TMDbMovie>>(result.Content.ReadAsStringAsync().Result);
            }
            else
            {
                throw new Exception(result.Content.ReadAsStringAsync().Result);
            }
        }

        public TMDbResponse<TMDbMovie> DiscoverMovies(List<int> genres, int? page, bool includeAdult = false, string language = "English", string region = "US")
        {
            var uriQuery = $"api_key={_apiKey}&page={page}&with_genres={string.Join(',', genres.ToArray())}&include_adult={includeAdult}&language={language}&region={region}";
            var getResponse = _httpClient.GetAsync($"{_baseAddress}/discover/movie?{uriQuery}");
            getResponse.Wait();

            var result = getResponse.Result;

            if (result.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<TMDbResponse<TMDbMovie>>(result.Content.ReadAsStringAsync().Result);
            }
            else
            {
                throw new Exception(result.Content.ReadAsStringAsync().Result);
            }
        }

        #endregion

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
