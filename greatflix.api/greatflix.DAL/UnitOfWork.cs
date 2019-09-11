using greatflix.dal.Interfaces;
using greatflix.dal.Repositories;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace greatflix.dal
{
    public class UnitOfWork : IUnitOfWork
    {
        private IDbConnection _connection;
        private IFavoriteGenreRepository _favoriteGenreRepository { get; set; }
        private IFavoriteFilmRepository _favoriteFilmRepository { get; set; }
        public UnitOfWork(MySqlConnection connection)
        {
            _connection = connection != null ? connection : throw new ArgumentNullException("connectionString");
        }

        public IFavoriteGenreRepository FavoriteGenreRepository
        {
            get
            {
                _favoriteGenreRepository = _favoriteGenreRepository ?? new FavoriteGenreRepository(_connection);
                return _favoriteGenreRepository;
            }
        }

        public IFavoriteFilmRepository FavoriteFilmRepository
        {
            get
            {
                _favoriteFilmRepository = _favoriteFilmRepository ?? new FavoriteFilmRepository(_connection);
                return _favoriteFilmRepository;
            }
        }
    }
}
