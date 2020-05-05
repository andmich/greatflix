using Greatflix.Application.Data.Messages;
using Greatflix.Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Application.Services
{
    public class FavoriteGenreService : ServiceBase<FavoriteGenreService>, IFavoriteGenreService
    {
        public FavoriteGenreService(
            IServiceProvider serviceProvider,
            IUnitOfWork unitOfWork, 
            IUserService userService) 
            : base(serviceProvider)
        {
        }

        public async Task<GetGenresResponse> GetAllFavoriteGenresAsync(Request request)
        {
            return await this.ExecuteAsync<GetGenresResponse>(request, async response =>
            {
                var allFavoriteGenres = await _unitOfWork.FavoriteGenreRepository.GetByUserId(_userService.GetUserId());
                response.FavoriteGenres = allFavoriteGenres.Select(entity => this._mapper.Map<Data.DTOs.FavoriteGenre>(entity)).ToList();
            });
        }

        public async Task<CreateGenreResponse> CreateGenreAsync(CreateGenreRequest request)
        {
            return await this.ExecuteAsync<CreateGenreResponse>(request, async response =>
            {
                var domainModel = this._mapper.Map<Greatflix.Data.Data.Models.FavoriteGenre>(request.FavoriteGenre);
                domainModel = await _unitOfWork.FavoriteGenreRepository.CreateRecordAsync(domainModel);
                response.FavoriteGenre = this._mapper.Map<Data.DTOs.FavoriteGenre>(domainModel);
            });
        }
    }
}
