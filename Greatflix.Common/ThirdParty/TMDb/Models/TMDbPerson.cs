using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class TMDbPerson : ITMDbModel
    {
        public int id { get; set; }
        public string profile_path { get; set; }
        public bool adult { get; set; }
        public List<FilmBase> known_for { get; set; }
        public string name { get; set; }
        public double popularity { get; set; }
    }
}
