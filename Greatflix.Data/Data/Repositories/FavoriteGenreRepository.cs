using Greatflix.Data.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data.Repositories
{
    public class FavoriteGenreRepository : RepositoryBase<FavoriteGenre>, IFavoriteGenreRepository
    {
        public FavoriteGenreRepository(IServiceProvider serviceProvider, GreatflixDbContext greatflixDbContext) 
            : base(serviceProvider, greatflixDbContext)
        {
        }

        public async Task<IList<FavoriteGenre>> GetByUserId(string userId)
        {
            return await _dbSet.Where(film => film.UserId == userId).ToListAsync();
        }
    }
}
