using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Greatflix.Application.Data.Messages;
using Greatflix.Application.Data.Messages.FavoriteFilms;
using Greatflix.Application.Services;
using Greatflix.Data.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Greatflix.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoriteGenreService _favoriteGenreService;
        private readonly IFavoriteFilmService _favoriteFilmService;

        public FavoritesController(
            IFavoriteGenreService favoriteGenreService,
            IFavoriteFilmService favoriteFilmService)
        {
            _favoriteGenreService = favoriteGenreService ?? throw new ArgumentNullException("favoriteGenreService");
            _favoriteFilmService = favoriteFilmService ?? throw new ArgumentNullException("favoriteFilmService");
        }

        [HttpGet]
        [Authorize]
        [Route("genres")]
        public async Task<IActionResult> GetGenres(Request request)
        {
            return Ok(await _favoriteGenreService.GetAllFavoriteGenresAsync(request));
        }

        [HttpPost]
        [Authorize]
        [Route("genres")]
        public async Task<IActionResult> CreateGenre([FromBody] CreateGenreRequest request)
        {
            return Ok(await _favoriteGenreService.CreateGenreAsync(request)); 
        }

        [HttpGet]
        [Authorize]
        [Route("films")]
        public async Task<IActionResult> GetFilms([FromQuery] GetFavoriteFilmsRequest request)
        {
            return Ok(await _favoriteFilmService.GetFavoriteFilms(request));
        }

        [HttpPost]
        [Authorize]
        [Route("films")]
        public async Task<IActionResult> AddFilm([FromBody] AddFavoriteFilmRequest request)
        {
            return Ok(await _favoriteFilmService.AddFavoriteFilmAsync(request));
        }
    }
}