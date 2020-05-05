using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greatflix.Common.ThirdParty;
using Greatflix.Common.ThirdParty.TMDb;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Greatflix.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly ITMDbClient _tmdbClient;
        public PeopleController(ITMDbClient tmdbClient)
        {
            _tmdbClient = tmdbClient ?? throw new ArgumentNullException("tmdbClient");
        }

        [HttpGet]
        [Route("popular")]
        public async Task<IActionResult> GetPopular([FromQuery] Request request)
        {
            return Ok(await _tmdbClient.GetPopularActorsAsync(request));
        }
    }
}