using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
                _unitOfWork.FavoriteGenreRepository.Insert(new dal.Models.FavoriteGenre
                {
                    AccountId = account.Id,
                    GenreId = insertFavoriteGenreDTO.GenreId,
                    Source = insertFavoriteGenreDTO.Source
                });

                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}