using AutoMapper;
using Greatflix.Data.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data.Repositories
{
    public abstract class RepositoryBase<TEntity> : IDisposable 
        where TEntity : class, IEntityBase<int>, new()
    {
        protected readonly IServiceProvider _serviceProvider;
        protected GreatflixDbContext _dbContext;
        protected DbSet<TEntity> _dbSet;
        protected IMapper _mapper;

        public RepositoryBase(IServiceProvider serviceProvider, GreatflixDbContext greatflixDbContext)
        {
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException("serviceCollection");
            _dbContext = greatflixDbContext ?? serviceProvider.GetRequiredService<GreatflixDbContext>();
            _mapper = serviceProvider.GetRequiredService<IMapper>();
            _dbSet = _dbContext.Set<TEntity>();
        }

        public async Task<List<TEntity>> GetAllRecordsAsync() => await _dbSet.ToListAsync();

        public async Task<TEntity> GetRecordByIdAsync(int id) => await _dbSet.Where(entity => entity.Id == id).SingleOrDefaultAsync();

        public async Task<List<TEntity>> GetRecordsByIdsAsync(List<int> ids) => await _dbSet.Where(entity => ids.Contains(entity.Id)).ToListAsync();

        public async Task<TEntity> CreateRecordAsync(TEntity entity) => (await _dbSet.AddAsync(entity)).Entity;

        public async void CreateRecordsAsync(List<TEntity> entities) => await _dbSet.AddRangeAsync(entities);

        bool disposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected async virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                await _dbContext.DisposeAsync();
            }

            disposed = true;
        }

        ~RepositoryBase()
        {
            Dispose(false);
        }
    }
}
