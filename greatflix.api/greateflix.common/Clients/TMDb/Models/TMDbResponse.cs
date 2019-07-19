using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.common.Clients.TMDb.Models
{
    public class TMDbResponse<T>
    {
        public int page { get; set; }
        public List<T> results { get; set; }
        public int total_results { get; set; }
        public int total_pages { get; set; }
    }
}
