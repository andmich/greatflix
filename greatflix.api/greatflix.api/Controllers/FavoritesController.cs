using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace greatflix.api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        public FavoritesController()
        {

        }

        [HttpGet]
        [Route("genres")]
        public IActionResult GetGenres()
        {

        }

        [HttpPost]
        [Route("genres")]
        public IActionResult InsertGenre()
        {

        }
    }
}