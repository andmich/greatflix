using AutoMapper;
using Greatflix.Data.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data.Repositories
{
    public class FavoriteFilmRepository : RepositoryBase<FavoriteFilm>, IFavoriteFilmRepository
    {
        public FavoriteFilmRepository(IServiceProvider serviceProvider, GreatflixDbContext greatflixDbContext) 
            : base(serviceProvider, greatflixDbContext)
        {
        }

        public async Task<IList<FavoriteFilm>> GetByUserId(string userId, int? filmTypeId = null)
        {
            return await _dbSet.Where(film => film.UserId == userId && (filmTypeId.HasValue && film.FilmTypeId == filmTypeId.Value)).ToListAsync();
        }
    }
}
