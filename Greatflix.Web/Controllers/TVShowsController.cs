using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greatflix.Common.ThirdParty;
using Greatflix.Common.ThirdParty.TMDb;
using Greatflix.Common.ThirdParty.TMDb.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Greatflix.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TVShowsController : ControllerBase
    {
        private readonly ITMDbClient _client;
        public TVShowsController(ITMDbClient client)
        {
            _client = client ?? throw new ArgumentNullException("client");
        }

        [HttpGet]
        [Route("discover")]
        public async Task<IActionResult> DiscoverTVShows([FromQuery] DiscoverTVShowsRequest request)
        {
            return Ok(await _client.DiscoverTVShowsAsync(request));
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetTVShowDetails([FromQuery, FromRoute] GetTVShowDetailsRequest request)
        {
            return Ok(await _client.GetTVShowDetailsAsync(request));
        }
    }
}