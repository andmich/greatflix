using Greatflix.Application.Data.Messages.FavoriteFilms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Application.Services
{
    public interface IFavoriteFilmService
    {
        Task<GetFavoriteFilmsResponse> GetFavoriteFilms(GetFavoriteFilmsRequest request);

        Task<AddFavoriteFilmResponse> AddFavoriteFilmAsync(AddFavoriteFilmRequest request);
    }
}
