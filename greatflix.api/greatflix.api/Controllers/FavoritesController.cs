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

            if (!string.IsNullOrEmpty(userId))
            {
                var favoriteGenres = _unitOfWork.FavoriteGenreRepository.GetByUserId(userId);

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

            if (!string.IsNullOrEmpty(userId))
            {
                try
                {
                    using (_unitOfWork)
                    {
                        _unitOfWork.FavoriteGenreRepository.Create(new dal.Models.FavoriteGenre
                        {
                            user_id = userId,
                            genre_id = insertFavoriteGenreDTO.GenreId,
                            source = insertFavoriteGenreDTO.Source
                        });

                        _unitOfWork.Commit();

                        return Ok();
                    }
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

                var favoriteMovies = _unitOfWork.FavoriteFilmRepository.GetByUserId(userId, (int)filmType);

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

                    _unitOfWork.FavoriteFilmRepository.Create(new dal.Models.FavoriteFilm
                    {
                        user_id = userId,
                        film_id = insertFavoriteFilmDTO.FilmId,
                        film_type_id = (int)insertFavoriteFilmDTO.FilmType.Value,
                        source = "tmdb"
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