using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.common.Clients.TMDb.Models
{
    public class TMDbResults<T>
    {
        public List<T> results { get; set; }
    }
}
