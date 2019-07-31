using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace greatflix.api.DTOs
{
    public class DiscoverMoviesDTO
    {
        public int? page { get; set; } = 1;
        public string genres { get; set; }
    }
}
