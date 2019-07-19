using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using greatflix.common.Clients.TMDb;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace greatflix.api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IOptions<AppSettings> _options;
        public GenresController(IOptions<AppSettings> options)
        {
            _options = options ?? throw new ArgumentNullException("options");
        }
        [HttpGet]
        public ActionResult Get([FromQuery] TMDbCommon.FilmType filmType)
        {
            string errorMessage;

            using (var tmdbClient = new TMDbClient(_options.Value.ApiKeys.TMDb["v3"]))
            {
                try
                {
                    var genres = tmdbClient.GetGenres(filmType);

                    return Ok(genres);
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