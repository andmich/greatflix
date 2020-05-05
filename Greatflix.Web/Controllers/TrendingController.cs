using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greatflix.Common.ThirdParty.TMDb;
using Greatflix.Common.ThirdParty.TMDb.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Greatflix.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TrendingController : ControllerBase
    {
        private readonly ITMDbClient _tmdbClient;
        public TrendingController(ITMDbClient tmdbClient)
        {
            _tmdbClient = tmdbClient ?? throw new ArgumentNullException("tmdbClient");
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetTrending([FromQuery] GetTrendingRequest request)
        {
            return Ok(await _tmdbClient.GetTrendingAsync(request));
        }
    }
}