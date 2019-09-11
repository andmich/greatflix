using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using greatflix.api.DTOs;
using greatflix.common.Clients.TMDb;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace greatflix.api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TVShowsController : ControllerBase
    {
        private readonly IOptions<AppSettings> _options;
        public TVShowsController(IOptions<AppSettings> options)
        {
            _options = options ?? throw new ArgumentNullException("options");
        }

        [HttpGet]
        [Route("discover")]
        public IActionResult GetByFilters([FromQuery] DiscoverTVShowsDTO filters)
        {
            string errorMessage;

            using (var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {
                // split genres 
                var genreList = filters.genres.Split(',').Select(Int32.Parse).ToList();

                try
                {
                    var tvShows = tmdbClient.DiscoverTVShows(genreList, filters.page);

                    return Ok(tvShows);
                }
                catch (Exception ex)
                {
                    errorMessage = ex.Message;
                }

                return BadRequest(new
                {
                    message = errorMessage
                });
            }
        }
    }
}