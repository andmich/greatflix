using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class Movie : FilmBase
    {
        public bool adult { get; set; }
        public long budget { get; set; }
        public string original_title { get; set; }
        public List<ProductionCompany> production_companies { get; set; }
        public string release_date { get; set; }
        public long revenue { get; set; }
        public int? runtime { get; set; }
        public string status { get; set; }
        public string tagline { get; set; }
        public string title { get; set; }
        public bool video { get; set; }
    }
}
