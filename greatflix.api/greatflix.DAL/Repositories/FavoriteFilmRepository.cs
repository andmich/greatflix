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
        public FavoriteFilmRepository(IDbConnection connection) 
            : base(connection)
        {
        }

        public void Create(FavoriteFilm newFavoriteFilm)
        {
            _connection.Execute(
                "sp_gf_insert_favoritefilm",
                new
                {
                    account_id = newFavoriteFilm.AccountId,
                    film_id = newFavoriteFilm.FilmId,
                    film_type_id = newFavoriteFilm.FilmTypeId,
                    source = newFavoriteFilm.Source
                },
                commandType: CommandType.StoredProcedure);
        }

        public List<FavoriteFilm> GetByAccountId(int accountId, int? filmTypeId = null)
        {
            return _connection.Query<FavoriteFilm>(
                "sp_gf_get_favoritefilms_by_account_id",
                new
                {
                    account_id = accountId,
                    film_type_id = filmTypeId
                },
                commandType: CommandType.StoredProcedure).ToList();
        }
    }
}
