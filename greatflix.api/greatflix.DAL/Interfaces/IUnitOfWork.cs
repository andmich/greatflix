using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IFavoriteGenreRepository FavoriteGenreRepository { get; }
        IFavoriteFilmRepository FavoriteFilmRepository { get; }

        void Commit();
    }
}
