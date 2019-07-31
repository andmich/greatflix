using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using greatflix.api.DTOs;
using greatflix.common.Clients.TMDb;
using greatflix.dal.DTOs;
using greatflix.dal.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace greatflix.api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public FavoritesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException("unitOfWork");
        }

        [HttpGet]
        [Authorize]
        [Route("genres")]
        public IActionResult GetGenres()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var account = _unitOfWork.AccountRepository.GetByUserId(userId);

            if (account != null)
            {
                var favoriteGenres = _unitOfWork.FavoriteGenreRepository.GetByAccountId(account.Id);

                return Ok(favoriteGenres);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("genres")]
        public IActionResult InsertGenre([FromBody] InsertFavoriteGenreDTO insertFavoriteGenreDTO)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var account = _unitOfWork.AccountRepository.GetByUserId(userId);

            if (account != null)
            {
                try
                {
                    _unitOfWork.FavoriteGenreRepository.Create(new dal.Models.FavoriteGenre
                    {
                        AccountId = account.Id,
                        GenreId = insertFavoriteGenreDTO.GenreId,
                        Source = insertFavoriteGenreDTO.Source
                    });

                    return Ok();
                }
                catch (Exception ex)
                {
                    // log 
                }

                return BadRequest();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("films")]
        public IActionResult GetFilms ([FromQuery] TMDbCommon.FilmType filmType)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (!string.IsNullOrEmpty(userId))
            {
                var account = _unitOfWork.AccountRepository.GetByUserId(userId);

                if (account == null)
                {
                    return Unauthorized();
                }

                var favoriteMovies = _unitOfWork.FavoriteFilmRepository.GetByAccountId(account.Id, (int)filmType);

                return Ok(favoriteMovies);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost, Authorize, Route("films")]
        public IActionResult InsertMovie([FromBody] InsertFavoriteFilmDTO insertFavoriteFilmDTO)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (!string.IsNullOrEmpty(userId))
            {
                if (insertFavoriteFilmDTO.FilmType.HasValue)
                {
                    var account = _unitOfWork.AccountRepository.GetByUserId(userId);

                    if (account == null)
                    {
                        return Unauthorized();
                    }

                    _unitOfWork.FavoriteFilmRepository.Create(new dal.Models.FavoriteFilm
                    {
                        AccountId = account.Id,
                        FilmId = insertFavoriteFilmDTO.FilmId,
                        FilmTypeId = (int)insertFavoriteFilmDTO.FilmType.Value,
                        Source = "tmdb"
                    });

                    return Ok();
                }
                else
                {
                    return BadRequest(new
                    {
                        message = "FILM TYPE IS INVALID"
                    });
                }
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}