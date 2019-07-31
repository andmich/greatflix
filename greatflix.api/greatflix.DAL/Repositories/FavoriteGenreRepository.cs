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
        public FavoriteGenreRepository(IDbConnection connection) 
            : base(connection)
        {
        }

        public List<FavoriteGenre> GetByAccountId(int accountId)
        {
            return _connection.Query<FavoriteGenre>(
                "sp_gf_get_favoritegenres_by_account_id",
                new
                {
                    account_id = accountId
                },
                commandType: CommandType.StoredProcedure).ToList();
        }

        public void Create(FavoriteGenre favoriteGenreToInsert)
        {
            _connection.Execute(
                "sp_gf_insert_favoritegenres",
                new
                {
                    account_id = favoriteGenreToInsert.AccountId,
                    genre_id = favoriteGenreToInsert.GenreId,
                    source = favoriteGenreToInsert.Source
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
