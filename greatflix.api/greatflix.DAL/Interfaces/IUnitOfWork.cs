using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Interfaces
{
    public interface IUnitOfWork
    {
        IFavoriteGenreRepository FavoriteGenreRepository { get; }
        IFavoriteFilmRepository FavoriteFilmRepository { get; }
    }
}
