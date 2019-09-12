using greatflix.dal.Interfaces;
using greatflix.dal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using System.Linq;

namespace greatflix.dal.Repositories
{
    public class FavoriteFilmRepository : RepositoryBase, IFavoriteFilmRepository
    {
        public FavoriteFilmRepository(IDbTransaction transaction) 
            : base(transaction)
        {
        }

        public void Create(FavoriteFilm newFavoriteFilm)
        {
            _connection.Execute(
                "sp_gf_insert_favorite_film",
                new
                {
                    p_user_id = newFavoriteFilm.user_id,
                    p_film_id = newFavoriteFilm.film_id,
                    p_film_type_id = newFavoriteFilm.film_type_id,
                    p_source = newFavoriteFilm.source
                },
                commandType: CommandType.StoredProcedure,
                transaction: _transaction);
        }

        public List<FavoriteFilm> GetByUserId(string userId, int? filmTypeId = null)
        {
            return _connection.Query<FavoriteFilm>(
                "sp_gf_get_favorite_films_by_user_id",
                new
                {
                    p_user_id = userId,
                    p_film_type_id = filmTypeId
                },
                commandType: CommandType.StoredProcedure,
                transaction: _transaction).ToList();
        }
    }
}
