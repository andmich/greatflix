using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.common.Clients.TMDb.Models
{
    public class TMDbMovie
    {
        public int id { get; set; }
        public string poster_path { get; set; }
        public string backdrop_path { get; set; }
        public long budget { get; set; }
        public string homepage { get; set; }
        public long revenue { get; set; }
        public int? runtime { get; set; }
        public string status { get; set; }
        public double vote_average { get; set; }
        public int vote_count { get; set; }
        public bool adult { get; set; }
        public string overview { get; set; }
        public string release_date { get; set; }
        public List<int> genre_ids { get; set; }
        public string original_title { get; set; }
        public string original_language { get; set; }
        public string title { get; set; }
        public decimal popularity { get; set; }
        public bool video { get; set; }
    }
}
