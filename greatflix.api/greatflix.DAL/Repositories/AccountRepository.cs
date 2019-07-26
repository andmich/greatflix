using greatflix.dal.Interfaces;
using greatflix.dal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;

namespace greatflix.dal.Repositories
{
    public class AccountRepository : RepositoryBase, IAccountRepository
    {
        public AccountRepository(IDbConnection connection) 
            : base(connection)
        {
        }

        public Account GetByUserId(string userId)
        {
            return _connection.QuerySingleOrDefault<Account>(
                "sp_gf_get_account_by_user_id",
                new
                {
                    user_id = userId
                },
                commandType: CommandType.StoredProcedure);
        }

        public void Insert(Account newAccount)
        {
            _connection.Execute(
                "sp_gf_account_insert",
                new
                {
                    user_id = newAccount.UserId
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
