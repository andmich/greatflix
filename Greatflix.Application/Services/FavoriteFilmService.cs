using Greatflix.Application.Data.Messages.FavoriteFilms;
using Greatflix.Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Application.Services
{
    public class FavoriteFilmService : ServiceBase<FavoriteFilmService>, IFavoriteFilmService
    {
        public FavoriteFilmService(IServiceProvider serviceProvider) 
            : base(serviceProvider)
        {
        }

        public async Task<GetFavoriteFilmsResponse> GetFavoriteFilms(GetFavoriteFilmsRequest request)
        {
            return await this.ExecuteAsync<GetFavoriteFilmsResponse>(request, async response =>
            {
                var userId = _userService.GetUserId() ?? throw new UnauthorizedAccessException();

                var favoriteMovies = await _unitOfWork.FavoriteFilmRepository.GetByUserId(userId, (int)request.filmType);
                response.favoriteMovies = favoriteMovies.Select(entity => this._mapper.Map<Data.DTOs.FavoriteFilm>(entity)).ToList();
            });
        }

        public async Task<AddFavoriteFilmResponse> AddFavoriteFilmAsync(AddFavoriteFilmRequest request)
        {
            return await this.ExecuteAsync<AddFavoriteFilmResponse>(request, async response =>
            {
                using (_unitOfWork)
                {
                    if (!request.FilmType.HasValue)
                        throw new Exception("Film type is invalid.");

                    var favoriteFilmToCreate = new Greatflix.Data.Data.Models.FavoriteFilm
                    {
                        FilmId = request.FilmId,
                        FilmTypeId = (int)request.FilmType.Value,
                        UserId = _userService.GetUserId(),
                        Source = "tmdb"
                    };
                    await _unitOfWork.FavoriteFilmRepository.CreateRecordAsync(favoriteFilmToCreate);
                    await _unitOfWork.SaveChangesAsync();
                    await _unitOfWork.Commit();
                }
            });
        }
    }
}
