using greatflix.dal.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Interfaces
{
    public interface IFavoriteGenreRepository
    {
        List<FavoriteGenre> GetByAccountId(int accountId);
        void Create(FavoriteGenre favoriteGenreToInsert);
    }
}
