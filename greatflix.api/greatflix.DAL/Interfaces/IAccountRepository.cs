using greatflix.dal.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Interfaces
{
    public interface IAccountRepository
    {
        Account GetByUserId(string userId);
        void Create(Account newAccount);
    }
}
