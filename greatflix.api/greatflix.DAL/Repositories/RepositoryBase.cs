using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace greatflix.dal.Repositories
{
    public abstract class RepositoryBase
    {
        protected IDbTransaction _transaction;
        protected IDbConnection _connection;
        public RepositoryBase(IDbTransaction transaction)
        {
            _transaction = transaction ?? throw new ArgumentNullException("connection");
            _connection = transaction.Connection;
        }
    }
}
