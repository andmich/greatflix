using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.DTOs
{
    public class DiscoverMoviesDTO
    {
        public int? page { get; set; } = 1;
        public string genres { get; set; }
    }
}
