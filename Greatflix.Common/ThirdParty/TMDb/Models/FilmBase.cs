using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class FilmBase : ITMDbModel
    {
        public int id { get; set; }
        public string backdrop_path { get; set; }
        public List<int> genre_ids { get; set; }
        public string homepage { get; set; }
        public string original_language { get; set; }
        public string overview { get; set; }
        public double popularity { get; set; }
        public string poster_path { get; set; }
        public string state { get; set; }
        public double vote_average { get; set; }
        public int vote_count { get; set; }
    }
}
