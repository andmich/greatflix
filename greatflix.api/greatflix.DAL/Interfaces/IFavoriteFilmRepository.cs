using greatflix.dal.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Interfaces
{
    public interface IFavoriteFilmRepository
    {
        List<FavoriteFilm> GetByAccountId(int accountId, int? filmTypeId = null);
        void Create(FavoriteFilm newFavoriteFilm);
    }
}
