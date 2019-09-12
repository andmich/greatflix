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
    public class FavoriteGenreRepository : RepositoryBase, IFavoriteGenreRepository
    {
        public FavoriteGenreRepository(IDbTransaction transaction) 
            : base(transaction)
        {
        }

        public List<FavoriteGenre> GetByUserId(string userId)
        {
            return _connection.Query<FavoriteGenre>(
                "sp_gf_get_favorite_genres_by_user_id",
                new
                {
                    p_user_id = userId
                },
                commandType: CommandType.StoredProcedure,
                transaction: _transaction).ToList();
        }

        public void Create(FavoriteGenre favoriteGenreToInsert)
        {
            _connection.Execute(
                "sp_gf_insert_favorite_genres",
                new
                {
                    p_user_id = favoriteGenreToInsert.user_id,
                    p_genre_id = favoriteGenreToInsert.genre_id,
                    p_source = favoriteGenreToInsert.source
                },
                commandType: CommandType.StoredProcedure,
                transaction: _transaction);
        }
    }
}
