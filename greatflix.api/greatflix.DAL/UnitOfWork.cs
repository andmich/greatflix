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
        private readonly IDbConnection _connection;
        private IDbTransaction _transaction;

        private IFavoriteGenreRepository _favoriteGenreRepository { get; set; }
        private IFavoriteFilmRepository _favoriteFilmRepository { get; set; }
        public UnitOfWork(MySqlConnection connection)
        {
            _connection = connection != null ? connection : throw new ArgumentNullException("connectionString");
            // open connection 
            _connection.Open();
            // start transaction
            _transaction = _connection.BeginTransaction();

        }

        public void Commit()
        {
            try
            {
                _transaction.Commit();
            }
            catch
            {
                _transaction.Rollback();
                throw;
            }
        }

        public IFavoriteGenreRepository FavoriteGenreRepository
        {
            get
            {
                _favoriteGenreRepository = _favoriteGenreRepository ?? new FavoriteGenreRepository(_transaction);
                return _favoriteGenreRepository;
            }
        }

        public IFavoriteFilmRepository FavoriteFilmRepository
        {
            get
            {
                _favoriteFilmRepository = _favoriteFilmRepository ?? new FavoriteFilmRepository(_transaction);
                return _favoriteFilmRepository;
            }
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _transaction.Dispose();
                    _connection.Dispose();
                    _transaction = null;
                    _connection = null;
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
