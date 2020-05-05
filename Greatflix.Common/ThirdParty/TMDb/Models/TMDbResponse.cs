using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class TMDbResponse<T> : Response
        where T : ITMDbModel
    {
        public int page { get; set; }
        public List<T> results { get; set; }
        public int total_results { get; set; }
        public int total_pages { get; set; }
    }
}
