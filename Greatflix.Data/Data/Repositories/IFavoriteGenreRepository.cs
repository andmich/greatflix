using Greatflix.Data.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data.Repositories
{
    public interface IFavoriteGenreRepository : IRepositoryBase<FavoriteGenre, int>
    {
        Task<IList<FavoriteGenre>> GetByUserId(string userId);
    }
}
