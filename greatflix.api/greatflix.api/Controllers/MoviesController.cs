using greatflix.common.Clients.TMDb;
using greatflix.common.Clients.TMDb.Models;
using greatflix.dal.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Net;
using static greatflix.common.Clients.TMDb.TMDbCommon;

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
        public ActionResult Search([FromQuery] string query, int? page = null, int? year = null, int? primaryReleaseYear = null, bool includeAdult = false, string language = "en-US", string region = "US")
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
        public ActionResult Get(int id, string appendToResponse = "")
        {
            string errorMessage;

            using(var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {
                try
                {
                    switch (appendToResponse.ToLower())
                    {
                        case "videos":
                            var movieDetailsAppendedVideos = tmdbClient.GetMovieDetailsAppended<TMDbAppendedVideos>(id, appendToResponse);

                            var returnObj = new
                            {
                                details = movieDetailsAppendedVideos.Item1,
                                videos = movieDetailsAppendedVideos.Item2.videos
                            };

                            return Ok(returnObj);
                        default:
                            var movieDetails = tmdbClient.GetMovieDetails(id);

                            return Ok(movieDetails);
                    }
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

        [HttpGet]
        [Route("popular")]
        public IActionResult GetPopular(int? page = null, string language = "en-US", string region = "US")
        {
            string errorMessage;

            using (var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {
                try
                {
                    var popular = tmdbClient.GetPopular<TMDbMovie>(FilmType.movie, language, region);

                    return Ok(popular);
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
        [Route("{id:int}/details")]
        public IActionResult GetDetails(int id, string language = "en-US", string appendResponse = "")
        {
            string errorMessage;

            using (var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {
                try
                {
                    switch(appendResponse.ToLower())
                    {
                        case "videos":
                            var movieDetailsAppendedVideos = tmdbClient.GetMovieDetailsAppended<TMDbAppendedVideos>(id, appendResponse);

                            var returnObj = new
                            {
                                details = movieDetailsAppendedVideos.Item1,
                                videos = movieDetailsAppendedVideos.Item2
                            };
                            
                            return Ok(returnObj);
                        default:
                            var movieDetails = tmdbClient.GetMovieDetails(id);

                            return Ok(movieDetails);
                    }
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
    }
}