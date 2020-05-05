using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class Results<T>
    {
        public List<T> results { get; set; }
    }
}
