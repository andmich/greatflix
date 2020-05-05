using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Data.Data.Models
{
    public interface IEntityBase<TId>
    {
        TId Id { get; set; }
    }
}
