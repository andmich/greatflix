using Greatflix.Data.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IFavoriteGenreRepository FavoriteGenreRepository { get; }
        IFavoriteFilmRepository FavoriteFilmRepository { get; }

        Task<int> SaveChangesAsync();
        Task Commit();
        void Rollback();
    }
}
