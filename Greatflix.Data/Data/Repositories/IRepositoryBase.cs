using Greatflix.Data.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Data.Data.Repositories
{
    public interface IRepositoryBase<TEntity, TId> 
        where TEntity : class, IEntityBase<TId>, new()
    {
        Task<List<TEntity>> GetAllRecordsAsync();

        Task<TEntity> GetRecordByIdAsync(TId id);

        Task<List<TEntity>> GetRecordsByIdsAsync(List<TId> ids);
        
        Task<TEntity> CreateRecordAsync(TEntity entity);

        void CreateRecordsAsync(List<TEntity> entities);
    }
}
