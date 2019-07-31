using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Interfaces
{
    public interface IUnitOfWork
    {
        IAccountRepository AccountRepository { get; }
        IFavoriteGenreRepository FavoriteGenreRepository { get; }
        IFavoriteFilmRepository FavoriteFilmRepository { get; }
    }
}
