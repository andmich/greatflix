using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace greatflix.dal.Repositories
{
    public abstract class RepositoryBase
    {
        protected IDbConnection _connection;
        public RepositoryBase(IDbConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException("connection");
        }
    }
}
