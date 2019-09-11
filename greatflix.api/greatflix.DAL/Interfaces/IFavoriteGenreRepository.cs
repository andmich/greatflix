using greatflix.dal.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Interfaces
{
    public interface IFavoriteGenreRepository
    {
        List<FavoriteGenre> GetByUserId(string userId);
        void Create(FavoriteGenre favoriteGenreToInsert);
    }
}
