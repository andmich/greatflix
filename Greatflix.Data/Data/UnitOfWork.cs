using Greatflix.Data.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly GreatflixDbContext _dbContext;
        private readonly IDbContextTransaction _dbContextTransaction;
        private readonly IServiceProvider _serviceProvider;
        private IFavoriteFilmRepository _favoritefilmRepository { get; set; }
        private IFavoriteGenreRepository _favoriteGenreRepository { get; set; }

        public UnitOfWork(IServiceProvider serviceProvider, GreatflixDbContext dbContext)
        {
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException("serviceProvider");
            _dbContext = dbContext ?? throw new ArgumentNullException("dbContext");
            _dbContextTransaction = _dbContext.Database.BeginTransaction();
        }
        public IFavoriteGenreRepository FavoriteGenreRepository
        {
            get
            {
                _favoriteGenreRepository = _favoriteGenreRepository ?? new FavoriteGenreRepository(_serviceProvider, _dbContext);
                return _favoriteGenreRepository;
            }
        }

        public IFavoriteFilmRepository FavoriteFilmRepository
        {
            get
            {
                _favoritefilmRepository = _favoritefilmRepository ?? new FavoriteFilmRepository(_serviceProvider, _dbContext);
                return _favoritefilmRepository;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public async Task Commit()
        {
            await _dbContextTransaction.CommitAsync();
        }

        public async void Rollback()
        {
            await _dbContextTransaction.RollbackAsync();
            await _dbContext.DisposeAsync();
        }

        bool disposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed) { return; }
            if (disposing) { _dbContext.Dispose(); }

            disposed = true;
        }
    }
}
