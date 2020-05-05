using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greatflix.Common.ThirdParty.TMDb;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Greatflix.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly ITMDbClient _client;
        public GenresController(ITMDbClient client)
        {
            _client = client ?? throw new ArgumentNullException("client");
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres([FromQuery] TMDbCommon.MediaType filmType)
        {
            return Ok(await _client.GetGenres(new Common.ThirdParty.TMDb.Messages.GetGenresRequest { mediaType = filmType }));
        }
    }
}