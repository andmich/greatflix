using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Domain.Data.Models
{
    public interface IDomainBase<TId>
    {
        TId Id { get; set; }
    }
}
