using greatflix.common.Clients.TMDb;
using greatflix.dal.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Net;

namespace greatflix.api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IOptions<AppSettings> _options;
        public MoviesController(IOptions<AppSettings> options)
        {
            _options = options ?? throw new ArgumentNullException("options");
        }

        [HttpGet]
        [Route("search")]
        public ActionResult Search([FromQuery] string query, int? page = null, int? year = null, int? primaryReleaseYear = null, bool includeAdult = false, string language = "English", string region = "US")
        {
            string errorMessage;

            // validate query

            using (var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {
                try
                {
                    var search = tmdbClient.SearchMovies(query, page, year, primaryReleaseYear, includeAdult, language, region);

                    return Ok(search);
                }
                catch (Exception ex)
                {
                    // log exception 

                    errorMessage = ex.Message;
                }

                return new ContentResult
                {
                    Content = errorMessage,
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult Get(int id)
        {
            string errorMessage;

            using(var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {

                try
                {
                    var movie = tmdbClient.GetMovie(id);

                    return Ok(movie);
                }
                catch (Exception ex)
                {
                    errorMessage = ex.Message;
                }

                return new ContentResult
                {
                    Content = errorMessage,
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };
            }
        }

        [HttpGet]
        [Route("discover")]
        public ActionResult GetByFilters([FromQuery] DiscoverMoviesDTO filters)
        {
            string errorMessage;

            using (var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {
                // split genres
                var genreList = filters.genres.Split(",").Select(Int32.Parse).ToList();

                try
                {
                    var movies = tmdbClient.DiscoverMovies(genreList, filters.page);

                    return Ok(movies);
                }
                catch (Exception ex)
                {
                    errorMessage = ex.Message;
                }

                return new ContentResult
                {
                    Content = errorMessage,
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };
            }
        }
    }
}