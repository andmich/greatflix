using Greatflix.Data.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data.Repositories
{
    public interface IFavoriteFilmRepository : IRepositoryBase<FavoriteFilm, int>
    {
        Task<IList<FavoriteFilm>> GetByUserId(string userId, int? filmTypeId = null);
    }
}
